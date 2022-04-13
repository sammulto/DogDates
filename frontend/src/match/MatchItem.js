import React from "react";

export default function MatchItem(props) {
  const imagePath = props.API_URL_IMAGES + "/" + props.pictures;
  return (
    <React.Fragment>
      <div className="user-info-box" data-testid="infoBox">
        <div className="user-info-content" data-testid="info">
          <img
            className="user-info-image"
            src={imagePath}
            alt="User Profile"
            data-testid="photo"
          />
          <div className="user-info-line">
            <span className="material-icons user-info-icon name">person</span>
            <div className="user-info-value">{props.ownerName}</div>
          </div>
          <div className="user-info-line">
            <span className="material-icons user-info-icon dog">pets</span>
            <div className="user-info-value">{props.dogName}</div>
          </div>
          <div className="user-info-line">
            <span className="material-icons user-info-icon city">place</span>
            <div className="user-info-value">{props.city}</div>
          </div>
          <div className="user-info-line">
            <span className="material-icons user-info-icon city">mail</span>
            <div className="user-info-intro-value">{props.email}</div>
          </div>
          <div className="user-info-intro-box">
            <span className="material-icons user-info-icon-intro">3p</span>
            <div className="user-info-intro-value">{props.description}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
