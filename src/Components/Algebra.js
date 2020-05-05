import React from 'react';
import Viewer from './Viewer_Stream'
//INSERT INFORMATION TO ACCESS STREAM HERE  
const Algebra = () => {
    const channelName = ""
    return (
        <div>
            <Viewer channelName={ channelName } />
        </div>
    );
}

export default Algebra;
