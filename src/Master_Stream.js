import React, { Component } from 'react'
import startMaster from './Master_Logic'
import $ from 'jquery';
export default class Example extends Component {
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
            accessKeyId: "AKIAIQNU6UNUID7GVOAA",
            endpoint: null,
            secretAccessKey: "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",
            sessionToken: null,
        }, ()=> {
            //TODO+}
        })

    //   navigator.mediaDevices
    //   .getUserMedia({video: true})
    //   .then(stream => {
    //     this.videoTag.current.srcObject = stream;
    //     console.log("Stream: ", stream)
    //   })
    //   .catch(console.log);
    

    }

    
  
  
    render() {

        console.log(this.videoTag)
        return (
        <div>
            <video
            ref={this.videoTag}
            autoPlay
            controls
        />
        <button>Start Master</button>
        </div>
        )
        
    }
  }