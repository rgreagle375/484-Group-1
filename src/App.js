import React, {Component, useState, useEffect} from 'react';
import Navbar from './Components/Navbar.js' 
import Dashboard from './Components/Dashboard'
import { BrowserRouter, Route, Router, Redirect} from 'react-router-dom';
import Home from './Components/Home'
import About from './Components/About'
import Login from './Components/Login'
import Physics from './Components/Physics'
import Algebra from './Components/Algebra'
import Calculus from './Components/Calculus'
import Services from './Components/Services'
import PublicRoute from './Components/PublicRoute'
import PrivateRoute from './Components/PrivateRoute'

class App extends Component {
 
  render() {
  
    return ( 
      <>
            <BrowserRouter>
            <Navbar></Navbar>
            <PublicRoute path = {"/home"} component={Home}/>
            <PublicRoute path = {"/about"} component={About}/>
            <PublicRoute path = {"/calculus"} component={Calculus}/>
            <PublicRoute path = {"/physics"} component={Physics}/>
            <PublicRoute path = {"/algebra"} component={Algebra}/>
            <PublicRoute path = {"/services"} component={Services}/>
            <PrivateRoute path = {"/login"} component={Login}/>

            </BrowserRouter>
            
      </>
    
  
    );

}
}

export default App;
