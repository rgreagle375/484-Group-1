import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom'
import '../layout/Login.css'
import axios from 'axios'

function Login (){
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('');
        
        const history = useHistory();

        const handleSubmit = () => {
            axios.post('/signin', {
                email: email,
                password: password
            }).then((res) => {
                if(res.status === 200){
                    console.log("Signed in successfully")
                    localStorage.setItem("JWT", JSON.stringify(res.data));
                    history.push('/about')
                }
            }).catch((err) => console.log(err));
        }

        return (
            <div>
                <h4 className = "white-text moveh"> Start Learning Today!!</h4>
                <div className = "container move" >
                        
                        <div className="white">
                            <h5 className = "grey-text text-darken-3"> Log In</h5>
                            <div className = "input-field">
                                <label htmlFor = "email">Email</label>
                                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className = "input-field">
                                <label htmlFor = "password">Password</label>
                                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <div className = "input-field">
                                <button onClick={handleSubmit} className = "btn yellow darken-1 z-depth-0">Login</button>
                            </div>
                        </div>
                </div>
            </div>
        )
}

export default withRouter(Login);

