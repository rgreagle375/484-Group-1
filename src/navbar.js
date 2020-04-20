import React from 'react';
import logo from './logo.svg';
import './App.css';

class navbar extends React.Component {
  render() {
    return (
        <div>
            <div class="flex-container">
                <nav class="navbar">
                    <div class="brand-title">TU Connected</div>
                    <div class="navbar-links">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Tutoring</a></li>
                        </ul>
                    </div>
                    <div>
                        <button>Sign In</button>
                    </div>
                </nav>
            </div>
                <div class="flex-container-2">
                <header>
                    <p>Subjects</p>
                </header>
                </div>
                <div class="flex-container-3">
                <section class="content-1">
                    <p>Algebra</p>
                </section>
                <section class="content-2">
                    <p>Calculus</p>
                </section>
                <section class="content-3">
                    <p>Physics</p>
                </section>
            </div>
        </div>
    );
  }
}

export default navbar;
