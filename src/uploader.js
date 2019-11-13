import React from "react";
import axios from "./axios";

// if you keep one component per file you can export as default
// it's good to keep a consistent style, one per file and default (or not)

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted!");
        console.log("this.props: ", this.props);
    }

    upload() {
        var fd = new FormData();
        fd.append("image", this.state.file);
        //console.log("this state file: ", this.state.file);
        axios
            .post("/upload", fd)
            .then(({ data }) => {
                this.props.setImage(data[0].image);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    render() {
        return (
            <div className="uploader">
                <div className="fields">
                    <input
                        className="inputfile"
                        type="file"
                        accept="image/*"
                        onChange={e => this.handleChange(e)}
                    />

                    <button onClick={() => this.upload()}>Upload</button>
                </div>
            </div>
        );
    }
}

//<label htmlFor="file">Choose a file</label>;
