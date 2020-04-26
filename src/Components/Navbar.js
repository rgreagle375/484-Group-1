import React, { Component, useState, setAuth} from 'react'
import './Navbar.css';
import {Link} from "react-router-dom" 
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'



const Navbar = () => {
    const [auth, setAuth] = useState(false)
        return (
            
            <div className="flex-container">
                <nav className="Navbar">
                    <div className="brand-title">TU Connected</div>
                    
                    <SignedOutLinks> </SignedOutLinks>  
                    {/* <SignedInLinks> </SignedInLinks>  */}
                
                </nav>
            </div>
            
        )
    }

 export default Navbar;
