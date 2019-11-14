import React from "react";
import axios from "./axios";
//import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        //console.log("registration");
        super(props);
        this.state = {
            error: null
        };
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        if (this.state.email.indexOf("@") == -1) {
            return this.setState({
                error: true
            });
        }
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/data");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: true
                });
            });
    }

    render() {
        //console.log("render reg");
        return (
            <div id="registration">
                {this.state.error && (
                    <div className="error">Oops! That was your fault!</div>
                )}
                <div id="reg-fields">
                    <input
                        name="first"
                        placeholder="First Name"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        placeholder="Last Name"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={e => this.handleChange(e)}
                    />
                </div>
                <button onClick={() => this.submit()}>Submit</button>
            </div>
        );
    }
}
