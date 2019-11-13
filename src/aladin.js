import React from "react";

export default class Aladin extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var aladin = A.aladin("#aladin-lite-div", {
            survey: "P/allWISE/color",
            fov: 1.5,
            target: "ngc2070"
        });
        $("input[name=survey]").change(function() {
            aladin.setImageSurvey($(this).val());
        });

        var marker1 = A.marker(84.65833333333333, -69.095, {
            popupTitle: "Tarantula Nebula",
            popupDesc: "Object type: Star forming cluster"
        });
        // var marker2 = A.marker(270.63206, -22.90555, {
        //     popupTitle: "HD 164514",
        //     popupDesc: "Object type: Star in cluster"
        // });
        // var marker3 = A.marker(270.598121, -23.030819, {
        //     popupTitle: "HD 164492",
        //     popupDesc: "Object type: Double star"
        // });
        var markerLayer = A.catalog();
        aladin.addCatalog(markerLayer);
        //    markerLayer.addSources([marker1, marker2, marker3]);
        markerLayer.addSources([marker1]);
    }

    render() {
        return (
            <div className="aladin">
                <div id="aladin-lite-div"></div>
                <input
                    id="allwise"
                    type="radio"
                    name="survey"
                    value="P/allWISE/color"
                />
                <label htmlFor="allwise">AllWISE</label>
                <input
                    id="DSS"
                    type="radio"
                    name="survey"
                    value="P/DSS2/color"
                />{" "}
                <label htmlFor="DSS">DSS color</label>
                <input
                    id="DSS-blue"
                    type="radio"
                    name="survey"
                    value="P/DSS2/blue"
                />
                <label htmlFor="DSS-blue">DSS blue</label>
                <input
                    id="2MASS"
                    type="radio"
                    name="survey"
                    value="P/2MASS/color"
                />
                <label htmlFor="2MASS">2MASS</label>
            </div>
        );
    }
}
