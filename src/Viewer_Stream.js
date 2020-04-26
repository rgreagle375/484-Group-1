import React, { Component } from 'react';
import startViewer from './Viewer_Logic'
export default class Viewer extends Component {
    constructor(props){
        super(props);
        this.videoTag = React.createRef();
    }

    componentWillMount() {
        setTimeout(() => {
            startViewer(this.videoTag, 
                {
                region: "us-east-2",
                channelName: "testchannel",
                clientId: Math.random()
                .toString(36)
                .substring(2)
                .toUpperCase(),
                sendVideo: true,
                sendAudio: true,
                openDataChannel: false,
                widescreen: true,
                fullscreen: false,
                useTrickleICE: true,
                natTraversalDisabled: false,
                forceTURN: false,
                accessKeyId: "",
                endpoint: null,
                secretAccessKey: "",
                sessionToken: null,
            }, ()=> {
                //TODO+}
            })
        }, 10000)
    }

    render() {
        return (
            <div>
                <video
                ref={this.videoTag}
                autoPlay
                controls
                />
            </div>
        )
    }
}