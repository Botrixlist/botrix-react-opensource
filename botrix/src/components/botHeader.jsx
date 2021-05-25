import React, { useState } from "react";
import { Link } from "react-router-dom";

function BotHeader(props) {
  const [bannerURL, setBannerURL] = useState(props.bot.bannerURL);
  const [pfp, setPfp] = useState(props.bot.logo);

  let pfpError = () => {
    setPfp("/default_pfp.png");
  };

  let bannerError = () => {
    setBannerURL("/default_banner.png");
  };

  return (
    <div className="bot-header">
      <div className="banner-holder">
        <img
          src={bannerURL}
          onError={bannerError}
          alt={`${props.bot.username}'s banner`}
        ></img>
      </div>
      <div className="pfp-holder">
        <img src={pfp} onError={pfpError} className="bot-icon"></img>
      </div>
      <div className="bot-info-holder">
        <h1>{props.bot.username}</h1>
        <div className="descrption-holder">
          <p>{props.bot.description}</p>
        </div>
      </div>

      <div className="button-holders">
        <div className="vote-button">
          <Link key="vote" to={`/v/${props.bot.botid}`}>
            <button className="big-button">Vote</button>
          </Link>
        </div>
        <div className="invite-button">
          <a key="invite" href={`${props.bot.invite}`}>
            <button className="big-button">Invite</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BotHeader;
