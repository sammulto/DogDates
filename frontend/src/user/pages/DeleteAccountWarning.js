import React, { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../shared/context/auth-context";
import "./DeleteAccountWarning.css";

/******************************************************************************* 
 * 
 * DeleteAccountWarning.js
 * 
 * This page displays a warning asking if the user wants to delete their account
 * If user clicks delete then the account is deleted from the DB
 * 
********************************************************************************/
const DeletedAccountWarning = (props) => {
  const { userInfo } = useContext(AuthContext);
  const auth = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(" ");

  const backToProfileHandler = () => {
    window.location = "/account";
  };

  const deleteAccountHandler = () => {
    axios
      .delete(
        //send patch request to backend
        `${props.API_URL}/api/users/${userInfo.uid}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((response) => {
        if (response) {
          //logout and redirect to confirm page
          auth.logout();
          window.location = "/accountdeleted";
        }
      })
      .catch((error) => {
        //show error message
        setShowError(true);
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <React.Fragment>
      <div className="warning-box">
        <div className="warning-content">
          <div>
            <h2 className="warning-title">You're Deleting Your Account!</h2>
            <span className="material-icons warning-icon">warning</span>
            <h2 className="warning-message">
              You won't be able to access your profile once your account is
              deleted.
            </h2>
          </div>
          <div
            className="warning-errorMessage" data-testid="errorMessage"
            style={showError ? { display: "block" } : { display: "none" }}
          >
            {errorMessage}
          </div>
          <div className="delete-btn-div">
            <input
              type="submit"
              className="goback-btn"
              value="Go Back"
              onClick={backToProfileHandler}
              data-testid="goBack"
            />
            <input
              type="submit"
              className="delete-comfirm-btn"
              value="Delete My Account"
              onClick={deleteAccountHandler}
              data-testid="deleteAccount"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DeletedAccountWarning;
