import React, { Component} from 'react'
import {Link} from "react-router-dom" 
import SignedOutLinks from '../navigation/SignedOutLinks'
import SignedInLinks from '../navigation/SignedInLinks'
import { isLogin } from '../navigation/utils/index.js';
import ReactDOM from 'react-dom'

const Navbar = () => {
      // need to work on authentication, ran into some bugs with the private route
      return(

              <SignedOutLinks></SignedOutLinks>
            //  <SignedInLinks/>
      )
}

 export default Navbar;

 
