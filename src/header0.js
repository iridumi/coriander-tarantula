import React from "react";
import ProfilePic from "./profile-pic";
import { Link } from "react-router-dom";
import { HashRouter, Route } from "react-router-dom";

export default function HeaderH({ imgUrl, toggleModal }) {
    return (
        <div className="hiddenH">
            <div>
                <img className="logo" src="/img/logo_t.png" />
            </div>

            <div className="hiddenH-text">
                <a href="/welcome">Home</a>
            </div>

            <div className="hiddenH-text">
                <a href="/schedule">Schedule</a>
            </div>

            <div className="hiddenH-text">
                <Link to="/data">Data</Link>
            </div>
            <div className="hiddenH-text">
                <Link to="/chat">Chat</Link>
            </div>
            <div className="hiddenH-text">
                <a href="/logout">Logout</a>
            </div>
            <div className="hiddenHPic">
                <ProfilePic imgUrl={imgUrl} toggleModal={toggleModal} />
            </div>
        </div>
    );
}
