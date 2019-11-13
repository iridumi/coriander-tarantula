import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
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
        // axios req and submit all my data in json format
        if (this.state.email.indexOf("@") == -1) {
            return this.setState({
                error: true
            });
        }
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
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
        return (
            <div id="login">
                {this.state.error && (
                    <div className="error">Oops! That was your fault!</div>
                )}
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
                <button onClick={() => this.submit()}>Log in</button>
            </div>
        );
    }
}
