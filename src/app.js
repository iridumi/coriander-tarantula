import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./register";
import HeaderH from "./header0";
import Aladin from "./aladin";
import Data from "./data";
//import LineChart from "./dthree";
import * as d3 from "d3";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";
import { Chat } from "./chat";
import Schedule from "./schedule";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    async componentDidMount() {
        console.log("App mounted");
        axios.get("/user").then(({ data }) => {
            //user.json ??
            //bio: data.rows[0].bio
            this.setState(data);
            //    console.log("user data: ", data);
        });

        //let data = d3.csv("/30Dor_cool.csv", function(d) {
        // d3.csv(
        //     "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

        // let data = d3.csv("/30Dor_cool.csv").then(function(data) {
        //     data.forEach(function(d) {
        //         d.wave = +d.wave;
        //         d.flux = +d.flux;
        //     });
        //     //console.log("data: ", data[0]);
        //     return data;
        //     //return { wave: data.wave, flux: data.flux };
        // });
        // console.log("returned data", data);

        let data = await d3.csv("/30Dor_cool.csv", function(d) {
            return {
                wave: +d.wave,
                flux: +d.flux
            };
        });
        //console.log(data);
        this.setState({
            data: data.map(item => item.wave)
        });

        //console.log(this.state.data);
        // ?????????????????????????????
        //let wave = this.state.data.map(item => item.wave);
        //console.log("data wave: ", wave);

        // this.setState({
        //     wave: wave
        // });
        // console.log(this.state.wave[0], this.state.wave[1], this.state.wave[2]);
    }

    toggleModal() {
        // console.log("I am toggleModal...");
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    setImage(newUrl) {
        // we pass it the new profile pic
        this.setState({ image: newUrl });
    }

    render() {
        const { id, first, last, image } = this.state;
        return (
            <BrowserRouter>
                <div>
                    <HeaderH
                        imgUrl={this.state.image}
                        toggleModal={() => this.toggleModal()}
                    />
                    <Route
                        exact
                        path="/register"
                        render={props => <Register />}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={this.setImage} />
                    )}
                    <Route exact path="/chat" component={Chat} />
                    <Route exact path="/aladin" component={Aladin} />
                    <div className="App">
                        <div className="App-header">
                            <Route
                                path="/data"
                                render={props => (
                                    <Data
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <Route exact path="/schedule" component={Schedule} />
                </div>
            </BrowserRouter>
        );
    }
}

/////////////////// for later /////////////////////
//imgUrl={imgUrl} onClick={toggleModal}

//<Aladin />{" "}

// imgUrl={this.state.image}
// toggleModal={() => this.toggleModal()}

// <h2>d3ia dashboard</h2>
// <LineChart
//     data={[9, 0, 7, 14, 5]}
//     size={[500, 500]}
// />

// <h2>d3ia dashboard</h2>
//</div>
//{" "}
//<div>
// <BarChart data={this.state.data} size={[500, 500]} />
//<BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
//{" "}
//</div>
//<div>
// data={this.state.data}
// width={this.state.width}
// height={this.state.height}
