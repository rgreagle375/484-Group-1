import React from 'react'
import '../layout/Dashboard.css'
const About = () =>{

    return(
        <div>
            <div className = "filler">
                {/* Why? */}
            </div>
                {/* <Slider></Slider> */}
                <div className="container no-color scrollspy" id = "About">
                <div className=" box z-depth-4 ">
                    <h4 className ="align-header black-text"> 
                    About
                    </h4>
                    <div className="carousel ">
                        <a className="carousel-item" href="#one!"><img src= { require('../photos/towson.png') } alt="towson" /></a>
                        <a className="carousel-item" href="#two!"><img src={ require('../photos/towson2.png') } alt="towson2" /></a>
                        <a className="carousel-item" href="#three!"><img src={ require('../photos/towson3.jpg') } alt="towson3" /></a>
                        <a className="carousel-item" href="#four!"><img src={ require('../photos/towson.png') } alt="towson"/></a>
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