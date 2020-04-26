
import React from 'react'
import {Route, Link, BrowserRouter as Router, Switch} from "react-router-dom" 
import './Dashboard.css';

const Dashboard = () =>{

    return(
            <div>
                <div class="flex-container-2">
                <header>
                    <p>Subjects</p>
                </header>
                </div>
                <div class="flex-container-3">
                <section class="content-1">
                    <a href = "/algebra">Algebra</a>
                </section>
                <section class="content-2">
                    <a href = '/calculus'>Calculus</a>
                </section>
                <section class="content-3">
                    <a href = '/physics'>Physics</a>
                </section>
                </div>
            </div>
    )
  }

export default Dashboard;
