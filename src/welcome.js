import React from "react";
import Register from "./register";
import Login from "./login";
import { BrowserRouter, Route } from "react-router-dom";
//import { HashRouter } from "react-router-dom";
import Header from "./header";

export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            userIsLoggedIn: false
        };
    }

    componentDidMount() {
        console.log("component mounted");
    }

    render() {
        return (
            <div className="welcome-page">
                <BrowserRouter>
                    <div>
                        {this.state.userIsLoggedIn} &&
                        <Header />
                    </div>

                    <div className="intro">
                        <Route
                            exact
                            path="/register"
                            render={props => <Register />}
                        />
                        <Route
                            exact
                            path="/login"
                            render={props => <Login />}
                        />
                        <p>
                            MYMT: Mapping the Youngest and most Massive stars in
                            the Tarantula nebula
                        </p>
                        <hr />

                        <p id="quote">
                            “Yes, I know, it’s not the truth, but in a great
                            history little truths can be altered so that the
                            greater truth emerges.” ―Umberto Eco, Baudolino
                        </p>
                    </div>
                    <div className="blank0"></div>
                    <div className="info">
                        <p>
                            The Tarantula Nebula was observed by Nicolas-Louis
                            de Lacaille during an expedition to the Cape of Good
                            Hope between 1751 and 1753. He catalogued it as the
                            second of the "Nebulae of the First Class",
                            "Nebulosities not accompanied by any star visible in
                            the telescope of two feet". It was described as a
                            diffuse nebula 20' across.
                        </p>
                        <div className="card">
                            <img src="/img/30dormontage.jpg" />
                        </div>
                    </div>
                    <div className="blank1">
                        <div className="blank1-text">
                            <h2>
                                Stellar population in <br /> the Tarantula
                                Nebula
                            </h2>
                        </div>
                    </div>
                    <div id="people" className="people">
                        <h2>People</h2>
                    </div>
                    <div className="blank2"></div>
                    <div className="press">
                        <h2>Press Releases</h2>
                    </div>
                    <div className="blank3"></div>
                    <div className="contact">
                        <h2>Contact</h2>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

// <div className="App-header">
//     <h2>d3ia dashboard</h2>
// </div>
// <div>
//     <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
// </div>
