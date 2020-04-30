import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLogin} from './utils/index.js';

//this code is the public route that the general(not signed in) user can access



const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/about" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;