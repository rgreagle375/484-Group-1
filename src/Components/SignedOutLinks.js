import React, { Component } from 'react'
import './Navbar.css';
import {NavLink} from "react-router-dom" 
import './Navbar.css'


const SignedOutLinks = () => {
        return (
            <div className = "Navbar-links">
                
            <ul>
                <li><a><NavLink to = '/home'>Home</NavLink></a></li>
                <li><a><NavLink to = '/about'>About</NavLink></a></li>
                <li><a><NavLink to = '/services'>Services</NavLink></a></li>
                <li><a><NavLink to = '/'>LogIn</NavLink></a></li>
            </ul>
            </div>
            
        )
    }

 export default SignedOutLinks
