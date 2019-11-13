import React from "react";
import { Link } from "react-router-dom";
//import Register from "./register";
import Login from "./login";
import { Route } from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <div>
                <img className="logo" src="/img/logo_t.png" />
            </div>

            <div className="header-text">
                <Link to="/register">Register</Link>
                <Link to="/login">Members Area</Link>
                <div className="login">
                    <Route exact path="/login" render={props => <Login />} />
                </div>
            </div>
        </div>
    );
}

// <div className="header-text">
//     <a href="/about">About</a>
// </div>
//
// <div id="people" className="header-text">
//     <a href="#people">People</a>
// </div>
//
// <div className="header-text">
//     <a href="/publications">Publications</a>
// </div>
//
// <div className="header-text">
//     <a href="/contact">Contact</a>
// </div>
