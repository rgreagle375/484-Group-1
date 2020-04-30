import React, { Component } from 'react';
import './Login.css'
class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    handleChange = e =>{
        this.setState({
            //update password and email by getting id
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = e =>{
        //prevents page refresh
        e.preventDefault();
        console.log(this.state);
    }

    // just add a signup button on the login component
    render() {
        return (
            <div>
                <h4 className = "white-text moveh"> Start Learning Today!!</h4>
            <div className = "container move" >
                <form onSubmit = {this.handleSubmit} className = "white">
                    
                    <h5 className = "grey-text text-darken-3"> Log In</h5>
                    <div className = "input-field">
                        <label htmlFor = "email">Email</label>
                        <input type="email" id="email" onChange = {this.handleChange}></input>
                    </div>
                    <div className = "input-field">
                        <label htmlFor = "password">Password</label>
                        <input type="password" id="password" onChange = {this.handleChange}></input>
                    </div>
                    <div className = "input-field">
                        <button className = "btn yellow darken-1 z-depth-0">Login</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default Login;
