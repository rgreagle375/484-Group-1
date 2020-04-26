import React, { Component } from 'react'
import './Navbar.css';
import {a} from "react-router-dom" 
import './Navbar.css'


const SignedOutLinks = () => {
        return (
            <div className = "Navbar-links">
                
            <ul>
                <li><a href='/home'>Home</a></li>
                <li><a href = '/about'>About</a></li>
                <li><a href='/services'>Services</a></li>
                <li><a href='/login'>LogIn</a></li>
            </ul>
            </div>
            
        )
    }

 export default SignedOutLinks
