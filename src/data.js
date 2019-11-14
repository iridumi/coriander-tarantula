import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import Aladin from "./aladin";

export default function Data() {
    const [files, setFiles] = useState([]);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        let ignore = false;
        if (!userInput) {
            (async () => {
                const { data } = await axios.get(`/api/data`);
                setFiles(data);
            })();
        } else {
            (async () => {
                console.log("userInput: ", userInput);
                const { data } = await axios.get(`/api/data/${userInput}`);
                console.log(data);
                if (!ignore) {
                    setFiles(data);
                }
            })();
        }
        return () => {
            console.log("cleaning up", userInput);
            ignore = true;
        };
    }, [userInput]);

    return (
        <div className="data">
            <Aladin />

            <div className="files-container">
                <input
                    name="user-input"
                    type="text"
                    placeholder="Search"
                    onChange={e => setUserInput(e.target.value)}
                />

                <div id="files">
                    {files.map(file => (
                        <div className="data-card" key={file.id}>
                            <Link key={file.id} to={`/data/${file.id}`}>
                                <p>
                                    {file.file}:{"   "}
                                    {file.name}
                                    {"   "} RA:{"   "} {file.ra}, {"   "}
                                    DEC: {"   "}
                                    {file.dec}
                                </p>
                                <img src={file.url} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

//<img src={file.img} />
// <input
//     className="inputfile"
//     type="file"
//     accept="image/*"
//     onChange={e => this.handleChange(e)}
// />
