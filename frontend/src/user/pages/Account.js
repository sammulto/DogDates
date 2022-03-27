import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import "./Account.css";

const Account = (props) => {
  const { userInfo } = useContext(AuthContext);

  const updateInfoHandler = () => {
    //redirect to update account info page
    window.location = "/updateAccInfo";
  };

  const delAccountHandler = () => {
    //redirect to warning page
    window.location = "/deleteaccountwarning";
  };

  if (userInfo) {
    const imagePath = props.API_URL_IMAGES+ "/" + userInfo.pictures;
    return (
      <React.Fragment>
        <div className="user-info-box">
          <div className="user-info-content">
            <h2 className="user-info-title">
              Welcome Back, {userInfo.ownerName}
            </h2>
            <img className="user-info-image" src={imagePath} alt="User Profile" />
            <div className="user-info-line">
              <span className="material-icons user-info-icon name">person</span>
              <div className="user-info-value">{userInfo.ownerName}</div>
            </div>
            <div className="user-info-line">
              <span className="material-icons user-info-icon dog">pets</span>
              <div className="user-info-value">{userInfo.dogName}</div>
            </div>
            <div className="user-info-line">
              <span className="material-icons user-info-icon city">place</span>
              <div className="user-info-value">{userInfo.city}</div>
            </div>
            <div className="user-info-intro-box">
              <span className="material-icons user-info-icon-intro">3p</span>
              <div className="user-info-intro-value">
                {userInfo.description}
              </div>
            </div>
            <div className="btn-div">
              <input
                type="submit"
                className="info-update-btn"
                value="Update My Profile"
                onClick={updateInfoHandler}
              />
              <input
                type="submit"
                className="account-delete-btn"
                value="Delete My Account"
                onClick={delAccountHandler}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <div>Your session is expired, please log out and log in again.</div>;
  }
};

export default Account;
