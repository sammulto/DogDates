import React from "react";

import "./AccountDelected.css";

const AccountDelected = () => {

    const imageURL = "https://cdn.pixabay.com/photo/2021/03/02/21/22/dog-6063829_960_720.jpg";

return (
    <React.Fragment>
        <div className="goodbye-content">
            <h1 className="goodbye-title">Hople To See You Again</h1>
            <div className="goodbye-image">
                <img 
                    src={imageURL}
                    alt="goodbye image" />
            </div>
            <div className="goodbye-message">
                We're sorry to see you go.
            </div>
            <div className="goodbye-message">
                Your account has been deleted.
            </div>
      </div>
    </React.Fragment>
);

}

export default AccountDelected;