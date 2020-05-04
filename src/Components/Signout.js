import React from 'react'
import axios from 'axios'
import { useHistory, withRouter, Link, Redirect } from 'react-router-dom'

export const Signout = () => {
    const history = useHistory();
    const handleSignOut = () => {
        var token = localStorage.getItem("JWT");
        var newToken = JSON.parse(token);
        axios.delete('/signout', {
            token: newToken.refreshToken
        })
        .then((res) => {
            if(res.staus === 200){
                alert("Successfully deleted token");
                localStorage.removeItem('JWT');
            }
        })
        .catch((err)=> alert(err))
    }
    return (
        <div>
            <button a href="/login" className = "black-text" type='button' onClick={handleSignOut}>Logout</button>
             
        </div>
    )
}
withRouter(Signout)
