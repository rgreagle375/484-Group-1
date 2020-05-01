import React from 'react';
import '../layout/Dashboard.css'
const Slider = () => {
    return (
        <div ClassName="slider">
          <ul ClassName="slides">
            <li>
            <img src={ require('../photos/towson.png') } alt="towson1" />
              <div ClassName="caption center-align">
                <h3>Learn More Today </h3>
                <h5 ClassName="light grey-text text-lighten-3">Here's our small slogan.</h5>
              </div>
            </li>
            <li>
            <img src={ require('../photos/towson2.png') } alt="towson2" />
              <div ClassName="caption left-align">
                <h3>Make a Difference</h3>
                <h5 ClassName="light grey-text text-lighten-3">Here's our small slogan.</h5>
              </div>
            </li>
            <li>
            <img src={ require('../photos/towson3.jpg') } alt="towson3" />
              <div ClassName="caption right-align">
                <h3>Our tutors care about their tutees</h3>
                <h5 ClassName="light grey-text text-lighten-3">Here's our small slogan.</h5>
              </div>
            </li>
            <li>
            <img src={ require('../photos/towson4.jpg') } alt="towson4" />
              <div ClassName="caption center-align">
                <h3>This is our big Tagline!</h3>
                <h5 ClassName="light grey-text text-lighten-3">Here's our small slogan.</h5>
              </div>
            </li>
          </ul>
        </div>     
    );
 
}

export default Slider;

