import React, {Component, useState, useEffect} from 'react';
import Navbar from './Components/Navbar.js' 
import Dashboard from './Components/Dashboard'
import { BrowserRouter } from 'react-router-dom';
//import {Router} from 'react-router-dom'

class App extends Component {
  render() {
    return (
          <BrowserRouter>
            <Navbar></Navbar>
            <Dashboard></Dashboard>
          </BrowserRouter>   
    );
  }
}

export default App;
