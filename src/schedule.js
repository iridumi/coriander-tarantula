import React from "react";

export default function Schedule() {
    return (
        <div className="calendar">
            <div className="past">
                <p> Past Meetings</p>
                <hr />
                <ul>
                    <li>
                        <a
                            href="http://www.iastro.pt/research/conferences/musebw19/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            MUSE Busy Week 2019
                        </a>{" "}
                        <i>Braga, Portugal, 04-08 November 2019</i>
                    </li>
                </ul>
            </div>
            <div className="fillspace"></div>
            <div className="future">
                <p> Future Meetings</p>
                <hr />
                <ul>
                    <li>
                        <a
                            href="https://www.massivestars2020.ie/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Massive Stars Near and Far
                        </a>{" "}
                        <i>Ireland 2020</i>
                    </li>
                </ul>
            </div>
        </div>
    );
}
