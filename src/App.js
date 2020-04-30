import React, {Component} from 'react';
import Navbar from './Components/layout/Navbar.js' 
import { BrowserRouter, Route, Router, Redirect} from 'react-router-dom';
import Home from './Components/layout/Home'
import About from './Components/layout/About'
import Login from './Components/layout/Login'
import Physics from './Components/layout/Physics'
import Algebra from './Components/layout/Algebra'
import Calculus from './Components/layout/Calculus'
import Services from './Components/layout/Services'
import PublicRoute from './navigation/PublicRoute'
import PrivateRoute from './navigation/PrivateRoute'
import Subjects from './Components/layout/Subjects'

class App extends Component {
 
  render() {
  
    return ( 
      <>
            <BrowserRouter>
            <Navbar></Navbar>
            <PublicRoute path = {"/home"} component={Home}/>
            <PublicRoute path = {"/about"} component={About}/>
            <PublicRoute path = {"/subjects"} component={Subjects}/>
            <PublicRoute path = {"/calculus"} component={Calculus}/>
            <PublicRoute path = {"/physics"} component={Physics}/>
            <PublicRoute path = {"/algebra"} component={Algebra}/>
            <PublicRoute path = {"/services"} component={Services}/>
           <PublicRoute path = {"/login"} component={Login}/>

            </BrowserRouter>
            
      </>
    
  
    );

}
}

export default App;
