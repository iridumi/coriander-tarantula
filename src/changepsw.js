import React from "react";
import axios from "./axios";

export default class Password extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.editPass = this.editPass.bind(this);
    }

    componentDidMount() {
        //    console.log("props in bio: ", this.props);
        this.setState({ password: this.props.password });
    }

    editPass(e) {
        e.preventDefault();
        //console.log("state in edit bio: ", this.state);
        axios
            .post("/editpassword", { password: this.state.password })
            .then(res => {
                //console.log("res data in bio edit: ", res.data);
                this.props.setPass(res.data);
                //console.log("data bio in bio edit: ", res.data.bio);
                //this.setState({ bioEditorIsVisible: false });
            })
            .catch(err => console.log(err));
    }

    render() {
        //console.log("Props bio: ", this.props.bio);
        return (
            <div className="bioeditor">
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
                    onChange={e => {
                        this.setState({ password: e.target.value });
                    }}
                />
                <button onClick={this.editPass}>Save</button>
            </div>
        );
    }
}
