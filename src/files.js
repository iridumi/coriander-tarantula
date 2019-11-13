import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function Data() {
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        let ignore = false;
        if (!userInput) {
            (async () => {
                const { data } = await axios.get(`/api/users`);
                setUsers(data);
            })();
        } else {
            (async () => {
                console.log("userInput: ", userInput);
                const { data } = await axios.get(`/api/users/${userInput}`);
                console.log(data);
                if (!ignore) {
                    setUsers(data);
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
                placeholder="Search for people"
                onChange={e => setUserInput(e.target.value)}
            />
            <h3>Look who just joined:</h3>
            <div id="users">
                {users.map(user => (
                    <Link
                        className="users-card"
                        key={user.first}
                        to={`/user/${user.id}`}
                    >
                        <img src={user.profile_pic} />
                        <h3>
                            {user.first} {user.last}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}
