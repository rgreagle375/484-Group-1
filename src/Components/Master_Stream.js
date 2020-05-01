import React, { Component } from 'react'
import startMaster from './Master_Logic'
export default class Master extends Component {
    constructor(props) {
      super(props);
      this.videoTag = React.createRef()
    }

    componentDidMount() {
        startMaster(this.videoTag, 
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
            accessKeyId: process.env.REACT_APP_ACCESS_KEY,
            endpoint: null,
            secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
            sessionToken: null,
        }, ()=> {
            //TODO+}
        })
    }
    
    render() {

        console.log(this.videoTag)
        return (
        <div>
            <video
            ref={this.videoTag}
            autoPlay
            controls
            muted
        />
        <button>Start Master</button>
        </div>
        )
        
    }
  }