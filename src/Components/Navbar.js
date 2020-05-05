import React, { useContext} from 'react'
import SignedOutLinks from '../navigation/SignedOutLinks'
import { JWTContext } from '../JWTContext'

function Navbar () {
            // need to work on authentication, ran into some bugs with the private route
            return(
                  <div>
                        <SignedOutLinks></SignedOutLinks>
                  </div>
         )
      
}

 export default Navbar;

 
