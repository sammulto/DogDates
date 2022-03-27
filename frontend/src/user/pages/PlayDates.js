import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";

export default function PlayDates(props) {
  const [potentialUsers, setPotentialUsers] = useState();
  const { userInfo } = useContext(AuthContext);
  const [likeUser, setLikeUser] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      if (userInfo) {
        axios
          .get(
            //send post request to backend
            `${props.API_URL}/api/view/${userInfo.uid}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          )
          .then((response) => {
            console.log("response ", response);
            setPotentialUsers(response.data);
            setLikeUser(false);
          })
          .catch((errorGettingUsers) => {});
      }
    };
    fetchUsers();
  }, [likeUser]);

  const likeUserHandler = () => {
    setLikeUser(true);
  };

  const dislikeUserHandler = () => {
    
  };

  return (
    <div>
      {console.log("userInfo >> ", userInfo)}
      {auth.isLoggedIn && potentialUsers && (
        <React.Fragment>
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
              <div className="btn-div">
                <input
                  type="submit"
                  className="like-btn"
                  value="Like"
                  onClick={likeUserHandler}
                />
                <input
                  type="submit"
                  className="dislike-btn"
                  value="Dislike"
                  onClick={dislikeUserHandler}
                />
              </div>
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
