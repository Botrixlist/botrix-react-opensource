import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/card.scss";

function BotCard(props) {
  const [image, setImage] = useState(props.icon);
  const [banner, setBanner] = useState(props.bannerURL);

  let imageError = () => {
    setImage("/default_pfp.png");
  };

  let bannerError = () => {
    setBanner("/default_banner.png");
  };

  return (
    <Link to={`/bots/${props.botid}`}>
      <div className="bot-card">
        <img
          className="banner-image"
          style={{ objectFit: "cover" }}
          src={banner}
          onError={bannerError}
        ></img>
        <div className="icon-holder">
          <img src={image} onError={imageError} alt={props.name + " Icon"} />
        </div>
        <div className="bot-info">
          <p>{props.username}</p>
          <div className="stats-container">
            <div className="votes-container">
              <img src={"/up-arrow.png"}></img>
              <p>{props.votes}</p>
            </div>
            <div className="server-container">
              <img src={"/server.png"}></img>
              <p>{props.servers}</p>
            </div>
          </div>

          <div className="description">
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* 
        <div className="bot-card">
           
            <div className="card-banner" style={{backgroundImage: this.props.bannerURL}}></div>
            <img src={this.props.icon} alt="" className="bot-icon"/>
            <h1>{this.props.username}</h1>
        </div> 
        */

export default BotCard;
