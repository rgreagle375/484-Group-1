import React from 'react'
import './Dashboard.css'
import Slider from './Slider'
const About = () =>{

    return(
    <div>
         
       <div className = "filler">
        
        </div>
    {/* <Slider></Slider> */}
    <div className = "filler">
        
    </div>
    <div className="container no-color scrollspy" id = "About">
    <div className=" box z-depth-4 ">
        <h4 className ="align-header black-text"> 
           About
        </h4>
        <div className="carousel ">
            <a className="carousel-item" href="#one!"><img src= { require('./towson.png') } /></a>
            <a className="carousel-item" href="#two!"><img src={ require('./towson2.png') } /></a>
            <a className="carousel-item" href="#three!"><img src={ require('./towson3.jpg') } /></a>
            <a className="carousel-item" href="#four!"><img src={ require('./towson.png') } /></a>
          </div>
          <div className="container">
              <p>
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sint fugit consectetur pariatur ex nesciunt,
                  fugiat voluptas harum molestias, temporibus dolorem cum ea blanditiis nobis tempore molestiae obcaecati soluta corporis quo, 
                  itaque maiores! Ut itaque
                  labore dolore adipisci nostrum facilis et, quas, mollitia quia culpa inventore consectetur assumenda sapiente quam.
              </p>
        </div>
       
</div>
        
</div>
    </div>

        
    

    )
}

export default About;