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
import Viewer_Stream from './Components/Viewer_Stream'
import Master_Stream from './Components/Master_Stream'
import  PrivateRoute  from './navigation/PublicRoute'
import MailingForm from './Components/MailingForm'
//import {UserContext} from './UserContext'
import { JWTContextProvider } from './JWTContext'

function App() {
  return ( 
    <BrowserRouter>
      <JWTContextProvider>
        <Navbar></Navbar>
        <PublicRoute exact path = "/about" component={About}/>
        <PublicRoute exact path = "/home" component={Home}/>
        <PublicRoute exact path = "/subjects" component={Subjects}/>
        <PublicRoute exact path = "/calculus" component={Calculus}/>
        <PublicRoute exact path = "/physics" component={Physics}/>
        <PublicRoute exact path = "/algebra" component={Algebra}/>
        <PublicRoute exact path = "/services" component={Services}/>
        <PublicRoute path = "/login" component={Login}/>
      
      </JWTContextProvider>
    </BrowserRouter>     
  )
}

export default App;
