import React, {Component, useContext, useState, useMemo} from 'react';
import Navbar from './Components/Navbar.js' 
import { BrowserRouter, Route, Router, Redirect} from 'react-router-dom';
import Home from './Components/Home'
import About from './Components/About'
import Login from './Components/Login'
import Physics from './Components/Physics'
import Algebra from './Components/Algebra'
import Calculus from './Components/Calculus'
import Services from './Components/Services'
import PublicRoute from './navigation/PublicRoute'
import Subjects from './Components/Subjects'
import  PrivateRoute  from './navigation/PrivateRoute'
//import {UserContext} from './UserContext'
import { JWTContextProvider } from './JWTContext'

function App() {
  return ( 
    <BrowserRouter>
      <JWTContextProvider>
        <Navbar></Navbar>
        <PrivateRoute exact path = "/about" component={About}/>
        <PrivateRoute exact path = "/home" component={Home}/>
        <PrivateRoute exact path = "/subjects" component={Subjects}/>
        <PrivateRoute exact path = "/calculus" component={Calculus}/>
        <PrivateRoute exact path = "/physics" component={Physics}/>
        <PrivateRoute exact path = "/algebra" component={Algebra}/>
        <PrivateRoute exact path = "/services" component={Services}/>
        <PublicRoute path = "/login" component={Login}/>
      </JWTContextProvider>
    </BrowserRouter>     
  )
}

export default App;
