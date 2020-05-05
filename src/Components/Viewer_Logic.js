var SignalingClient = require('amazon-kinesis-video-streams-webrtc').SignalingClient;
var AWS = require('aws-sdk');


export default async function startViewer(remoteView, viewerValues, onStatsReport) {
    const viewer = {};
    viewer.remoteView = remoteView;

    // // Create KVS client
    const kinesisVideoClient = new AWS.KinesisVideo({
        region: viewerValues.region,
        accessKeyId: viewerValues.accessKeyId,
        secretAccessKey: viewerValues.secretAccessKey,
        sessionToken: viewerValues.sessionToken,
        endpoint: viewerValues.endpoint,
    });

    // Get signaling channel ARN
    const describeSignalingChannelResponse = await kinesisVideoClient
        .describeSignalingChannel({
            ChannelName: viewerValues.channelName,
        })
        .promise();
    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    console.log('[VIEWER] Channel ARN: ', channelARN);

    // Get signaling channel endpoints
    const getSignalingChannelEndpointResponse = await kinesisVideoClient
        .getSignalingChannelEndpoint({
            ChannelARN: channelARN,
            SingleMasterChannelEndpointConfiguration: {
                Protocols: ['WSS', 'HTTPS'],
                Role: window.KVSWebRTC.Role.VIEWER,
            },
        })
        .promise();
    //Gathering all endpoints which will only come from the master to connect to them
    const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
        endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
        return endpoints;
    }, {});
    console.log('[VIEWER] Endpoints: ', endpointsByProtocol);

    const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
        region: viewerValues.region,
        accessKeyId: viewerValues.accessKeyId,
        secretAccessKey: viewerValues.secretAccessKey,
        sessionToken: viewerValues.sessionToken,
        endpoint: endpointsByProtocol.HTTPS,
    });

    // Get ICE server configuration
    const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
        .getIceServerConfig({
            ChannelARN: channelARN,
        })
        .promise();
    const iceServers = [];
    if (!viewerValues.natTraversalDisabled && !viewerValues.forceTURN) {
        iceServers.push({ urls: `stun:stun.kinesisvideo.${viewerValues.region}.amazonaws.com:443` });
    }
    if (!viewerValues.natTraversalDisabled) {
        getIceServerConfigResponse.IceServerList.forEach(iceServer =>
            iceServers.push({
                urls: iceServer.Uris,
                username: iceServer.Username,
                credential: iceServer.Password,
            }),
        );
    }
    console.log('[VIEWER] ICE servers: ', iceServers);

    // Create Signaling Client
    viewer.signalingClient = new window.KVSWebRTC.SignalingClient({
        channelARN,
        channelEndpoint: endpointsByProtocol.WSS,
        clientId: viewerValues.clientId,
        role: window.KVSWebRTC.Role.VIEWER,
        region: viewerValues.region,
        credentials: {
            accessKeyId: viewerValues.accessKeyId,
            secretAccessKey: viewerValues.secretAccessKey,
            sessionToken: viewerValues.sessionToken,
        },
    });
    const configuration = {
        iceServers,
        iceTransportPolicy: viewerValues.forceTURN ? 'relay' : 'all',
    };
    viewer.peerConnection = new RTCPeerConnection(configuration);

    // Poll for connection stats
    viewer.peerConnectionStatsInterval = setInterval(() => viewer.peerConnection.getStats().then(onStatsReport), 1000);

    viewer.signalingClient.on('open', async () => {
        console.log('[VIEWER] Connected to signaling service');
        // Create an SDP offer to send to the master
        console.log('[VIEWER] Creating SDP offer');
        await viewer.peerConnection.setLocalDescription(
            await viewer.peerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            }),
        );

        // When trickle ICE is enabled, send the offer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
        if (viewerValues.useTrickleICE) {
            console.log('[VIEWER] Sending SDP offer');
            viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
        }
        console.log('[VIEWER] Generating ICE candidates');
    });

    viewer.signalingClient.on('sdpAnswer', async answer => {
        // Add the SDP answer to the peer connection
        console.log('[VIEWER] Received SDP answer');
        await viewer.peerConnection.setRemoteDescription(answer);
    });

    viewer.signalingClient.on('iceCandidate', candidate => {
        // Add the ICE candidate received from the MASTER to the peer connection
        console.log('[VIEWER] Received ICE candidate');
        viewer.peerConnection.addIceCandidate(candidate);
    });

    viewer.signalingClient.on('close', () => {
        console.log('[VIEWER] Disconnected from signaling channel');
    });

    viewer.signalingClient.on('error', error => {
        console.error('[VIEWER] Signaling client error: ', error);
    });

    // Send any ICE candidates to the other peer
    viewer.peerConnection.addEventListener('icecandidate', ({ candidate }) => {
        if (candidate) {
            console.log('[VIEWER] Generated ICE candidate');

            // When trickle ICE is enabled, send the ICE candidates as they are generated.
            if (viewerValues.useTrickleICE) {
                console.log('[VIEWER] Sending ICE candidate');
                viewer.signalingClient.sendIceCandidate(candidate);
            }
        } else {
            console.log('[VIEWER] All ICE candidates have been generated');

            // When trickle ICE is disabled, send the offer now that all the ICE candidates have ben generated.
            if (!viewerValues.useTrickleICE) {
                console.log('[VIEWER] Sending SDP offer');
                viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
            }
        }
    });

    // As remote tracks are received, add them to the remote view
    viewer.peerConnection.addEventListener('track', event => {
        console.log('[VIEWER] Received remote track');
        if (remoteView.current.srcObject) {
            return;
        }
        viewer.remoteStream = event.streams[0];
        remoteView.current.srcObject = viewer.remoteStream;
    });

    console.log('[VIEWER] Starting viewer connection');
    viewer.signalingClient.open();
}