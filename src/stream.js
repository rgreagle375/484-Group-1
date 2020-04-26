import React, { useRef } from 'react';
var SignalingClient = require('amazon-kinesis-video-streams-webrtc').SignalingClient;
var AWS = require('aws-sdk');
const Stream = () => {

    function getRandomClientId() {
        return Math.random()
            .toString(36)
            .substring(2)
            .toUpperCase();
    }
    function onStatsRep(report) {
        // TODO: Publish stats
    }

    const masterProperties = {
        region: "us-east-2",
        channelName: "testchannel",
        clientId: getRandomClientId(),
        sendVideo: true,
        sendAudio: true,
        openDataChannel: false,
        widescreen: true,
        fullscreen: false,
        useTrickleICE: true,
        natTraversalDisabled: false,
        forceTURN: false,
        accessKeyId: "AKIAIQNU6UNUID7GVOAA",
        endpoint: null,
        secretAccessKey: "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",
        sessionToken: null,
    };

    let videoRef = useRef(null);

    const MyLocalView = document.getElementById("localView");

    // const viewRef = () => {
    //     videoRef.current.focus();
    //     console.log("Here :" ,videoRef.current)
    // }
    const logRegion = () => {
        console.log(masterProperties.region)
    }

    return (
        <div>
            <video id="localView" ref={videoRef} autoPlay playsInline controls muted ></video>
            
            <button type="button" onClick={() => startMaster(startMaster(MyLocalView, masterProperties, onStatsRep)) }>Start Stream</button>
            <button type="button" onClick={ () => stopMaster()}>Stop Master</button>

        </div>
    )

}

var master = {
    signalingClient: null,
    peerConnectionByClientId: {},
    localStream: null,
    peerConnectionStatsInterval: null,
};


async function startMaster(localView, streamerValues, onStatsReport) {
    //This function will perform all of the necessary actions to create the stream 
    try {
    master.localView = localView; //What the streamer will see
    
    // Create KVS client
    const kinesisVideoClient = new AWS.KinesisVideo({
        region: streamerValues.region,
        accessKeyId: streamerValues.accessKeyId,
        secretAccessKey: streamerValues.secretAccessKey,
        sessionToken: streamerValues.sessionToken,
        endpoint: streamerValues.endpoint,
    })
    


    // Get signaling channel ARN
    const describeSignalingChannelResponse = await kinesisVideoClient
        .describeSignalingChannel({
            ChannelName: streamerValues.channelName, // Use the name to get properties associated with that channel name
        }).promise();

    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN; //getting Amazon Resource Network
    console.log('[MASTER] Channel ARN: ', channelARN);

    // Get signaling channel endpoints
    const getSignalingChannelEndpointResponse = await kinesisVideoClient
        .getSignalingChannelEndpoint({
            ChannelARN: channelARN,
            SingleMasterChannelEndpointConfiguration: {
                Protocols: ['WSS', 'HTTPS'],
                Role: window.KVSWebRTC.Role.MASTER,
            },
        }).promise();
    //Gather endpoints to connect to the viewers that enter the stream
    //There are usually only two endpoints, WSS and HTTP
    const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
        endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
        return endpoints;
    }, {});
    console.log('[MASTER] Endpoints: ', endpointsByProtocol);

    // Create Signaling Client from the master's perspective
    master.signalingClient = new window.KVSWebRTC.SignalingClient({
        channelARN,
        channelEndpoint: endpointsByProtocol.WSS,
        role: window.KVSWebRTC.Role.MASTER,
        region: streamerValues.region,
        credentials: {
            accessKeyId: streamerValues.accessKeyId,
            secretAccessKey: streamerValues.secretAccessKey,
            sessionToken: streamerValues.sessionToken,
        },
    });

    // Get ICE server configuration
    const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
        region: streamerValues.region,
        accessKeyId: streamerValues.accessKeyId,
        secretAccessKey: streamerValues.secretAccessKey,
        sessionToken: streamerValues.sessionToken,
        endpoint: endpointsByProtocol.HTTPS,
    });
    const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
        .getIceServerConfig({
            ChannelARN: channelARN,
        }).promise();
    const iceServers = [];
    //These two if statements send ICE servers based on the type of NAT traversal disabled
    if (!streamerValues.natTraversalDisabled && !streamerValues.forceTURN) {
        iceServers.push({ urls: `stun:stun.kinesisvideo.${streamerValues.region}.amazonaws.com:443` });
    }
    if (!streamerValues.natTraversalDisabled) {
        getIceServerConfigResponse.IceServerList.forEach(iceServer =>
            iceServers.push({
                urls: iceServer.Uris,
                username: iceServer.Username,
                credential: iceServer.Password,
            }),
        );
    }
    console.log('[MASTER] ICE servers: ', iceServers);

    const configuration = {
        iceServers,
        iceTransportPolicy: streamerValues.forceTURN ? 'relay' : 'all',
    };

    //Gather resolution and determine whether Audio and Video will be sent
    const resolution = streamerValues.widescreen ? { width: { ideal: 1280 }, height: { ideal: 720 } } : { width: { ideal: 640 }, height: { ideal: 480 } };
    const constraints = {
        video: resolution,
        audio: streamerValues.sendAudio,
    };

    // Get a stream from the webcam and display it in the local view
    try {
        master.localStream = await navigator.mediaDevices.getUserMedia(constraints);
        localView.srcObject = master.localStream;
    } catch (e) {
        console.error(e);
    }

    master.signalingClient.on('open', async () => {
        console.log('[MASTER] Connected to signaling service');
    });

    master.signalingClient.on('sdpOffer', async (offer, remoteClientId) => { // SDP offer that is sent 
        console.log('[MASTER] Received SDP offer from client: ' + remoteClientId);

        // Create a new peer connection using the offer from the given client
        const peerConnection = new RTCPeerConnection(configuration);
        master.peerConnectionByClientId[remoteClientId] = peerConnection;

        // Poll for connection stats
        if (!master.peerConnectionStatsInterval) {
            master.peerConnectionStatsInterval = setInterval(() => peerConnection.getStats().then(onStatsReport), 1000);
        }

        // Send any ICE candidates to the other peer
        peerConnection.addEventListener('icecandidate', ({ candidate }) => {
            if (candidate) { // if we have an ICE candidate, aka if another peer connected to our signaling channel
                console.log('[MASTER] Generated ICE candidate for client: ' + remoteClientId);

                // When trickle ICE is enabled, send the ICE candidates as they are generated.
                if (streamerValues.useTrickleICE) {
                    console.log('[MASTER] Sending ICE candidate to client: ' + remoteClientId);
                    master.signalingClient.sendIceCandidate(candidate, remoteClientId);
                }
            } else {
                console.log('[MASTER] All ICE candidates have been generated for client: ' + remoteClientId);

                // When trickle ICE is disabled, send the answer now that all the ICE candidates have ben generated.
                if (!streamerValues.useTrickleICE) {
                    console.log('[MASTER] Sending SDP answer to client: ' + remoteClientId);
                    master.signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId);
                }
            }
        });

        master.localStream.getTracks().forEach(track => peerConnection.addTrack(track, master.localStream));
        await peerConnection.setRemoteDescription(offer);

        // Create an SDP answer to send back to the client
        console.log('[MASTER] Creating SDP answer for client: ' + remoteClientId);
        await peerConnection.setLocalDescription(
            await peerConnection.createAnswer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            }),
        );

        // When trickle ICE is enabled, send the answer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
        if (streamerValues.useTrickleICE) {
            console.log('[MASTER] Sending SDP answer to client: ' + remoteClientId);
            master.signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId);
        }
        console.log('[MASTER] Generating ICE candidates for client: ' + remoteClientId);
    });

    master.signalingClient.on('iceCandidate', async (candidate, remoteClientId) => {
        console.log('[MASTER] Received ICE candidate from client: ' + remoteClientId);

        // Add the ICE candidate received from the client to the peer connection
        const peerConnection = master.peerConnectionByClientId[remoteClientId];
        peerConnection.addIceCandidate(candidate);
    });

    master.signalingClient.on('close', () => {
        console.log('[MASTER] Disconnected from signaling channel');
    });

    master.signalingClient.on('error', () => {
        console.error('[MASTER] Signaling client error');
    });

    console.log('[MASTER] Starting master connection');
    master.signalingClient.open();
    } catch (err) {
        console.log("There was an error")
    }
}

function stopMaster() {
    //this function runs through the necessary procedures to close down a stream
    console.log('[MASTER] Stopping master connection');
    if (master.signalingClient) {
        master.signalingClient.close();
        master.signalingClient = null;
    }

    //Cancel connections with all peers that are connected to master
    Object.keys(master.peerConnectionByClientId).forEach(clientId => {
        master.peerConnectionByClientId[clientId].close();
    });
    master.peerConnectionByClientId = [];

    //Stops local stream
    if (master.localStream) {
        master.localStream.getTracks().forEach(track => track.stop());
        master.localStream = null;
    }
    if (master.peerConnectionStatsInterval) {
        clearInterval(master.peerConnectionStatsInterval);
        master.peerConnectionStatsInterval = null;
    }

    if (master.localView) {
        master.localView.srcObject = null;
    }
}
export default Stream;