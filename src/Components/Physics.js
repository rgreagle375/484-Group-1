import React from 'react';
import '../layout/Dashboard.css'
import Master_Stream from './Master_Stream'
import Viewer_Stream from './Viewer_Stream'
const Physics = () => {
    return (
        <div>
            <h1 className = "white-text ">Physics</h1>
            <Master_Stream/>
            <Viewer_Stream/>
           
        </div>
    );
}

export default Physics;
