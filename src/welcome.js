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
                    <Header />

                    <div className="intro">
                        <Route
                            exact
                            path="/register"
                            render={props => <Register />}
                        />

                        <p id="title">
                            MYMT: Mapping the Youngest and most Massive stars in
                            the Tarantula nebula
                        </p>
                        <hr />
                        <p id="introduction">
                            The Universe is chemically and dynamically shaped by
                            the massive stars. These stars, born with a mass of
                            more than ten times our Sun, have short lives and
                            spectacular deaths as supernova explosions. The
                            early re-ionization of the Universe, the formation
                            of the first galaxies, the chemical composition and
                            the recently detected gravitational waves are mainly
                            in the hands of the most massive stars. However, our
                            knowledge of the formation and evolution of these
                            stellar monsters is uncertain, caveat that
                            propagates to many fields in Astronomy. To
                            understand the Universe and how It has evolved we
                            need to understand the most massive stars.
                        </p>
                        <p id="quote">
                            “Yes, I know, it’s not the truth, but in a great
                            history little truths can be altered so that the
                            greater truth emerges.” ―{" "}
                            <span id="author">Umberto Eco, Baudolino</span>
                        </p>
                    </div>
                    <div className="blank0">
                        <div className="blank0-text">
                            <h2>Electronic density</h2>
                        </div>
                    </div>
                    <div className="info">
                        <p>
                            <p id="title">The Heart of the Tarantula Nebula</p>
                            <hr />
                            <br />
                            The Tarantula Nebula was observed by Nicolas-Louis
                            de Lacaille during an expedition to the Cape of Good
                            Hope between 1751 and 1753. The core of the nebular
                            was initially considered the most massive star
                            found, 1000 times the Sun. The advances in the
                            astronomical instrumentation showed, in fact,
                            thousands of massive stars populate the Tarantula
                            Nebula. The heart of the Tarantula nebula (known as
                            NGC 2070) is intrinsically the brightest
                            star-forming region in the Local Group. The
                            proximity of NGC 2070 (49 kpc) allows us to resolve
                            the stellar population, making this massive cluster
                            a perfect laboratory to test stellar evolution
                            theories.
                            <br />
                            <br />
                            Based on the state-of-the-art of MUSE integral field
                            spectrograph. The MYMT project pursues to dissecting
                            the highly dense stellar core of NGC 2070 providing
                            the most complete spectroscopic census of massive
                            stars and their interplay with the stellar medium.
                            MYMT’s outcomes will shed new light in the formation
                            of the most massive stars supporting/refuting the
                            different evolutionary scenarios suggested by the
                            theory.
                        </p>
                        <div className="card">
                            <img src="/img/30dormontage.jpg" />
                            <p>© NASA/ESA</p>
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
                    <div className="people">
                        <p id="people">People</p>
                        <hr />
                        <div className="people-info">
                            <div className="people-card">
                                <img src="/img/Norberto_Castro.jpg" />
                                <h3>Dr. Norberto Castro</h3>
                                <p>Principal Investigator</p>
                            </div>
                            <div className="people-card">
                                <img src="/img/rick.jpg" />
                                <h3>Rick Sanchez</h3>
                                <p>Trouble-Maker Investigator</p>
                            </div>
                            <div className="people-card">
                                <img src="/img/chuck.jpg" />
                                <h3>Chuck Norris</h3>
                                <p>Ph. D. Student</p>
                            </div>
                        </div>
                    </div>
                    <div className="blank2">
                        <div className="blank2-text">
                            <h2>Interstellar medium</h2>
                        </div>
                    </div>
                    <div className="press">
                        <p id="press">Press Releases</p>
                        <hr />
                        <ul id="publications">
                            <li>
                                <a
                                    href="https://ui.adsabs.harvard.edu/abs/2018A%26A...614A.147C/abstract"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Mapping the core of the Tarantula Nebula
                                    with VLT-MUSE. I. Spectral and nebular
                                    content around R136
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://ui.adsabs.harvard.edu/abs/2017Msngr.170...40C/abstract"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Dissecting the Core of the Tarantula Nebula
                                    with MUSE
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="blank3">
                        <div className="blank3-text">
                            <h2>Kinematic of the interstellar medium</h2>
                        </div>
                    </div>
                    <div className="contact">
                        <p id="contact">Contact</p>
                        <div id="address">
                            <p>
                                Dr. Norberto Castro
                                <br />
                            </p>
                            <p>
                                Leibniz-Institut für Astrophysik Potsdam (AIP)
                                <br />
                                An der Sternwarte 16, <br />
                                14482 Potsdam, Germany
                            </p>
                        </div>
                        <hr />
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
