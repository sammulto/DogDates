import React, { useContext } from "react";

import RegisterButton from "../components/RegisterButton";
import { AuthContext } from "../../shared/context/auth-context";

import "./Home.css";

export default function Home(props) {
  const auth = useContext(AuthContext);
  return (
    <div className="home-page">
      <div className="home-page__content">
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
        {!auth.isLoggedIn && (
           <RegisterButton />
        )}
        </div>
      </div>
    </div>
  );
}
