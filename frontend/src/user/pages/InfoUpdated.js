import React from "react";

import "./InfoUpdated.css";

/******************************************************************************* 
 * 
 * InfoUpdated.js
 * 
 * This page informs the user that their profile has been updated 
 * 
********************************************************************************/
const InfoUpdated = () => {

return (
    <React.Fragment>
        <div className = "message-info-box">
            <div>
                <span className="material-icons info-icon">how_to_reg</span>
                <h2 className = "message-info-title">Your account profile has been updated, please log in again.</h2>
            </div>
        </div>
    </React.Fragment>
);

}

export default InfoUpdated;