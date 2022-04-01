import React, { useContext } from "react";

import RegisterButton from "../components/RegisterButton";

import FindPlayDatesButton from "../components/FindPlayDatesButton";

import EditProfileButton from "../components/EditProfileButton";

import MyMatchesButton from "../components/MyMatchesButton";

import { AuthContext } from "../../shared/context/auth-context";

import "./Home.css";

/****************************************************************************************** 
 * 
 * Home.js
 * 
 * This is the main home page. 
 * It has buttons that allow the user to register a new account or log in * 
 * 
******************************************************************************************/
export default function Home(props) {
  const auth = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);

  return (
    <div className="home-page">
      <div className="home-page__content">
        {!auth.isLoggedIn && (
        <div className="home-page-not-logged">
          <h1>Dog Dates </h1>
          <div className="home-page__introduction" data-testid= "body">
            Want to find a play date for your dog?
            <br></br>
            Dog dates is the best way to find dogs in your area that are looking
            for friends just like you!
          </div>
          <div className="home-page__image" data-testid= "photo">
            <img 
              src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_28/1587661/dogs-age-years-kb-inline-200707.jpg"
              alt="homePageDogsImage" />
          </div>
          <div data-testid= "button">
            <RegisterButton />
          </div>
        </div>
        )}
        {auth.isLoggedIn && (
          <div className="home-page-logged">
            <h2 className="user-info-title">
              Welcome Back, {userInfo.ownerName}
            </h2>
            <FindPlayDatesButton />
            <EditProfileButton />
            <MyMatchesButton />
          </div>
         )}
      </div>
    </div> 
  );
}
