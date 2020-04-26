import React, { Component } from 'react'
import './Navbar.css';
import {NavLink} from "react-router-dom" 

const SignedInLinks = () => {
        return (
            <div className = "Navbar-links">
                
            <ul>
                <li><a><NavLink to = '/home'>Home</NavLink></a></li>
                <li><a><NavLink to = '/about'>About</NavLink></a></li>
                <li><a><NavLink to = '/Services'>Services</NavLink></a></li>
                <li><a><NavLink to = '/'>LogOut</NavLink></a></li>
            </ul>
            </div>
            
        )
    }

 export default SignedInLinks
