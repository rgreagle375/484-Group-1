import React, { Component, useContext} from 'react'
import {Link} from "react-router-dom" 
import SignedOutLinks from '../navigation/SignedOutLinks'
import SignedInLinks from '../navigation/SignedInLinks'
import { isLogin } from '../navigation/utils/index.js';
import { JWTContext } from '../JWTContext'

function Navbar () {
      const { setJWT , jwt} = useContext(JWTContext);

            // need to work on authentication, ran into some bugs with the private route
            return(
                  <div>
                        <SignedOutLinks></SignedOutLinks>
                  </div>
            //  <SignedInLinks/>
         )
      
}

 export default Navbar;

 
