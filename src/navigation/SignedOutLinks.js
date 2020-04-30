import React, { Component } from 'react'
import {a} from "react-router-dom" 


const SignedOutLinks = () => {
        return (
            <nav className="nav-wrapper yellow darken-1 z-depth-3">
            {/* <!-- using container allows for margins and not left alignment --> */}
            <div className="container">
                {/* <!-- large screen --> */}
                <a href="#" className="brand-logo center hide-on-large-only">
                    <span className = "black-text"> Tu Connected </span>
                 <i className="material-icons black-text">book</i></a>
                 {/* <!-- medium and small screens --> */}
                <a href="#" className="brand-logo left hide-on-med-and-down">
                    <span className = "black-text"> Tu Connected </span>
                 <i className="material-icons black-text">book</i></a>
                {/* <!-- making mobile menu --> */}
                <a href="#" className="sidenav-trigger" data-target="mobile-links">
                    <i className="material-icons black-text ">menu</i>
                </a>
                {/* <!-- hide-on-med-and-down needed for mobile menu --> */}
                <ul className = "hide-on-med-and-down right">
                    <li className><a href="/about" id ="About" className = "black-text">Home</a></li>
                    <li><a href="/about" id = "About" className = "black-text">About</a></li>
                    <li><a href="/services" id = "Services"class = "black-text">Services</a></li>
                    <li><a href="/subjects"id = "Subjects" className = "black-text">Subjects</a></li>
                    <li><a href="/login" className = "black-text">Login</a></li> 
        
                    <li><a href="" className="black-text"><i className="material-icons black-text right"> person</i></a></li>
                </ul>
            </div>
        </nav>
        )
    }

 export default SignedOutLinks
