import React, { useContext }  from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { isLogin } from './utils/index.js';
import { JWTContext } from '../JWTContext'


//This seems to only work with local storage, need to figure out a 
//fix for contextAPI

const PrivateRoute = ({component: Component, ...rest}) => {
    const {jwt} = useContext(JWTContext)
    return (
        <Route 
            {...rest} 
            render={props => 
                {
                    if(localStorage.getItem('JWT') == null){
                        //was previously if(jwt === '') to check if there was a jwt token present
                        return(
                        <Redirect to='/login'/>
                        )
                    }
                    return(  
                       <Component {...props}/>
                    );
                }
            }
        />
    )
};

export default PrivateRoute;



