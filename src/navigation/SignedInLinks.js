import React, { Component } from 'react'
import {Link, withRouter, Route, Switch, Router} from "react-router-dom" 


const SignedInLinks = () => {
        return (
    <div>
    <nav class="nav-wrapper yellow darken-1 z-depth-3">
    {/* <!-- using container allows for margins and not left alignment --> */}
    <div class="container">
        {/* <!-- large screen --> */}
        <a href="#" class="brand-logo center hide-on-large-only">
            <span class = "black-text"> Tu Connected </span>
         <i class="material-icons black-text">book</i></a>
         {/* <!-- medium and small screens --> */}
        <a href="#" class="brand-logo left hide-on-med-and-down">
            <span class = "black-text"> Tu Connected </span>
         <i class="material-icons black-text">book</i></a>
        {/* <!-- making mobile menu --> */}
        <a href="#" class="sidenav-trigger" data-target="mobile-links">
            <i class="material-icons black-text ">menu</i>
        </a>
        {/* <!-- hide-on-med-and-down needed for mobile menu --> */}
        <ul class = "hide-on-med-and-down right">
            <li class><a href="/about" id ="About" class = "black-text">Home</a></li>
            <li><a href="/about" id = "About" class = "black-text">About</a></li>
            <li><a href="/services" id = "Services"class = "black-text">Services</a></li>
            <li><a href="/subjects"id = "Subjects" class = "black-text">Subjects</a></li>
            <li><a href="/about" class = "black-text">Logout</a></li>

            <li><a href="" class="black-text"><i class="material-icons black-text right"> person</i></a></li>
        </ul>
    </div>
</nav>


<ul class="sidenav"id="mobile-links">
    <li><a href="#"><i class="material-icons">person</i></a></li>
    <li><a href="/about">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/subjects">Subjects</a></li>
</ul>

</div>
        
        )
    }

 export default SignedInLinks
