import React from "react";

export default function ProfilePic({ first, last, imgUrl, toggleModal }) {
    imgUrl = imgUrl || "/img/default.jpg";

    return (
        <div className="profilePic">
            <img onClick={toggleModal} src={imgUrl} alt={(first, last)} />
        </div>
    );
}
