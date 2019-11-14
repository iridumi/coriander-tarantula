import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    //    console.log("here are the last 10 chat messages", chatMessages);
    const elemRef = useRef();

    useEffect(() => {
        if (!elemRef.current) {
            return;
        }

        //console.log("chat mounted");
        //console.log("scroll top: ", elemRef.current.scrollTop);
        //console.log("scroll height: ", elemRef.current.scrollHeight);
        //console.log("client height: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]); //[] if you want it to run once. you might want to run it again if there is a new chat message. this is to make the scroll bar go down to see the last msgs

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            //    console.log("e.target.value ", e.target.value);
            //    console.log("e.key ", e.key);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    if (!chatMessages) {
        return null;
    }

    return (
        console.log("msg in chat: ", chatMessages),
        (
            <div className="chat">
                <div className="chat-container" ref={elemRef}>
                    {chatMessages.map((msg, chatsid) => (
                        <div className="msg-card" key={chatsid}>
                            <p>
                                <img src={msg.image} />
                                {msg.first} {msg.last} said:
                            </p>
                            <p id="msg">{msg.message}</p>
                        </div>
                    ))}
                </div>
                <textarea
                    placeholder="Add your chat message here"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        )
    );
}
