import React from "react";

import MatchItem from "./MatchItem";

import './MatchList.css'

export default function MatchList(props) {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No matches found.</h2>
      </div>
    );
  }

  const API_URL_IMAGES = props.API_URL_IMAGES;
  return (
    <ul>
      <h1 className="matches-title">My Matches</h1>
      {props.items.map((user) => (
        <MatchItem
          key={user.uid}
          ownerName={user.ownerName}
          imagePath={user.pictures}
          dogName={user.dogName}
          city={user.city}
          email={user.email}
          description={user.description}
          pictures={user.pictures}
          API_URL_IMAGES={API_URL_IMAGES}
        />
      ))}
    </ul>
  );
}
