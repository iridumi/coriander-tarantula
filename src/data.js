import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

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
        <div className="users-container">
            <input
                name="user-input"
                type="text"
                placeholder="Search"
                onChange={e => setUserInput(e.target.value)}
            />
            <p>Data:</p>
            <div id="users">
                {files.map(file => (
                    <Link
                        className="data-card"
                        key={file.id}
                        to={`/user/${file.id}`}
                    >
                        <img src={file.img} />
                        <h3>
                            {file.first} {file.last}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}
