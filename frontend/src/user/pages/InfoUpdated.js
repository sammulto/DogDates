import React from "react";

import "./InfoUpdated.css";

const InfoUpdated = () => {

return (
    <React.Fragment>
        <a className = "message-info-box">
            <div>
                <span className="material-icons info-icon">how_to_reg</span>
                <h2 className = "message-info-title">Your account profile has been updated, please log in again.</h2>
            </div>
        </a>
    </React.Fragment>
);

}

export default InfoUpdated;