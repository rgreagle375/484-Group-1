import React, { Component } from 'react'
import './Navbar.css';
import {Link, withRouter, Route, Switch, Router} from "react-router-dom" 
import Home from './Home'
import About from './About'
import Services from './Services'

const SignedInLinks = () => {
        return (
            <div className = "Navbar-links">
            <ul>  
                <li><a href ='/home'>Home</a></li>
                <li><a href = '/about'>About</a></li>
                <li><a href = '/services'>Services</a></li>
                <li><a href = '/logout'>LogOut</a></li>
            
            </ul>
            </div>
            
        )
    }

 export default SignedInLinks
