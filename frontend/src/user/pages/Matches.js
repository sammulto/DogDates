import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";

import MatchList from "../../match/MatchList";

export default function Matches(props) {
  //current logged in user
  const { userInfo } = useContext(AuthContext);
  const auth = useContext(AuthContext);

  //getting the next user state
  const [matchedUsers, setMatchedUsers] = useState();
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
            `${props.API_URL}/api/match/list/${userInfo.uid}`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          )
          .then((response) => {
            let promises = [];
            //if no matched users, set matched users to undefined
            if (response.data.length === 0) {
              setMatchedUsers();
              setLoading(false);
            } else {
              let listUsers = [];
              response.data.forEach((matchedUser) => {
                promises.push(
                  axios
                    .get(
                      //send get request to backend
                      `${props.API_URL}/api/match/${matchedUser}`,
                      {
                        headers: {
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                      }
                    )
                    .then((response) => {
                      listUsers.push(response.data);
                    })
                    .catch((errorGettingUsers) => {
                      setShowError(true);
                      setErrorMessage(errorGettingUsers.response.data.error);
                      setMatchedUsers(false);
                      setLoading(false);
                    })
                );
              });
              Promise.all(promises).then(() => {
                setMatchedUsers(listUsers);
                setLoading(false);
              });
            }
          })
          .catch((errorGettingUsers) => {
            setShowError(true);
            setErrorMessage(errorGettingUsers.response.data.error);
            setMatchedUsers(false);
            setLoading(false);
          });
      }
    };
    fetchUsers();
  }, [props.API_URL, userInfo]);

  return (
    <div>
      {auth.isLoggedIn && !loading && matchedUsers && (
        <React.Fragment>
          <div
            className="login-errorMessage"
            data-testid="errorMsg"
            style={showError ? { display: "block" } : { display: "none" }}
          >
            {" "}
            {errorMessage}{" "}
          </div>
          <MatchList
            items={matchedUsers}
            API_URL_IMAGES={props.API_URL_IMAGES}
          />
        </React.Fragment>
      )}

      {auth.isLoggedIn && !loading && !matchedUsers && (
        <React.Fragment>
          <div className="user-info-box">
            <div className="user-info-content">
              <h2 className="no-new-dates-msg">Sorry, there are no matches.</h2>
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
