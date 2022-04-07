import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../shared/context/Auth-context";

import './PlayDates.css'

/****************************************************************************************** 
 * 
 * PlayDates.js
 * 
 * This page displays the profile information of accounts in a user's city
 * It displays one account at a time and allows the user to click 'like' or 'dislike'
 * It will only show accounts that the user has not seen before
 * 
******************************************************************************************/
export default function PlayDates(props) {
  //current logged in user
  const { userInfo } = useContext(AuthContext);
  const auth = useContext(AuthContext);

  //getting the next user state
  const [potentialUsers, setPotentialUsers] = useState();
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);

  //error hooks
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setShowError(false);
      if (userInfo) {
        setLoading(true);
        axios
          .get(
            //send get request to backend
            `${props.API_URL}/api/view/${userInfo.uid}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          )
          .then((response) => {
            //if no new unseen users, set potential users to undefined
            if (response.data.length === 0) setPotentialUsers();
            else setPotentialUsers(response.data);
            setLoading(false);
          })
          .catch((errorGettingUsers) => {
            setShowError(true);
            setErrorMessage(errorGettingUsers.response.data.error);
            setPotentialUsers(false);
            setLoading(false);
          });
      }
    };
    fetchUsers();
  }, [props.API_URL, userInfo, counter]);

  const likeUserHandler = () => {
    setLoading(true);
    axios
      .patch(
        //send patch request to backend
        `${props.API_URL}/api/like/${userInfo.uid}`,
        { uid: potentialUsers.uid },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        //increment counter so our useEffect for fetch users is triggered
        setCounter(counter + 1);
      })
      .catch((errorLikingUser) => {
        setShowError(true);
        setErrorMessage(errorLikingUser.response.data.error);
      });
  };

  const dislikeUserHandler = () => {
    axios
      .patch(
        //send patch request to backend
        `${props.API_URL}/api/dislike/${userInfo.uid}`,
        { uid: potentialUsers.uid },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        //increment counter so our useEffect for fetch users is triggered
        setCounter(counter + 1);
      })
      .catch((errorDislikingUser) => {
        setShowError(true);
        setErrorMessage(errorDislikingUser.response.data.error);
      });
  };

  return (
    <div>
      {auth.isLoggedIn && potentialUsers && !loading && (
        <React.Fragment>
          <div
            className="login-errorMessage"
            data-testid="errorMsg"
            style={showError ? { display: "block" } : { display: "none" }}
          >
            {" "}
            {errorMessage}{" "}
          </div>
          <div className="user-info-box">
            <div className="user-info-content">
              <h2 className="user-info-title">{potentialUsers.ownerName}</h2>
              <img
                className="user-info-image"
                src={props.API_URL_IMAGES + "/" + potentialUsers.pictures}
                alt="Potential User Profile"
              />
              <div className="user-info-line">
                <span className="material-icons user-info-icon name">
                  person
                </span>
                <div className="user-info-value">
                  {potentialUsers.ownerName}
                </div>
              </div>
              <div className="user-info-line">
                <span className="material-icons user-info-icon dog">pets</span>
                <div className="user-info-value">{potentialUsers.dogName}</div>
              </div>
              <div className="user-info-line">
                <span className="material-icons user-info-icon city">
                  place
                </span>
                <div className="user-info-value">{potentialUsers.city}</div>
              </div>
              <div className="user-info-intro-box">
                <span className="material-icons user-info-icon-intro">3p</span>
                <div className="user-info-intro-value">
                  {potentialUsers.description}
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  className="like-btn"
                  value="Like"
                  onClick={likeUserHandler}
                />
                <input
                  type="submit"
                  className="like-btn"
                  value="Dislike"
                  onClick={dislikeUserHandler}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}

      {auth.isLoggedIn && !potentialUsers && !loading && (
        <React.Fragment>
          <div className="user-info-box">
            <div className="user-info-content">
              <h2 className="no-new-dates-msg">
                Sorry, there are no new play dates available. <br></br>
                Please come back later.
              </h2>
            </div>
          </div>
        </React.Fragment>
      )}

      {!auth.isLoggedIn && (
        <div>Your session is expired, please log out and log in again.</div>
      )}
    </div>
  );
}
