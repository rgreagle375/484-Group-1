import React from 'react';
import './Dashboard.css'
const Slider = () => {
    return (

<div ClassName="slider">
    <ul ClassName="slides">
      <li>
      <img src={ require('./towson.png') } />
        <div ClassName="caption center-align">
          <h3>Learn More Today </h3>
          <h5 ClassName="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>
      </li>
      <li>
      <img src={ require('./towson2.png') } />
        <div ClassName="caption left-align">
          <h3>Make a Difference</h3>
          <h5 ClassName="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>
      </li>
      <li>
       <img src={ require('./towson3.jpg') } />
        <div ClassName="caption right-align">
          <h3>Our tutors care about their tutees</h3>
          <h5 ClassName="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>
      </li>
      <li>
      <img src={ require('./towson4.jpg') } />
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

