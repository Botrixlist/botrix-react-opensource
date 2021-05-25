import React, { useState } from "react";

function SearchBot(props) {
  let [pfp, setPfp] = useState(props.bot.logo);
  let [banner, setBanner] = useState(props.bot.bannerURL);

  let imageError = () => {
    setPfp("/default_pfp.png");
  };

  let bannerError = () => {
    setBanner("/default_banner.png");
  };
  return (
    <div>
      <div className="bot-row">
        <img className="bot-banner" onError={bannerError} src={banner}></img>
        <p>{props.bot.username}</p>
        <img onError={imageError} src={pfp}></img>
      </div>
    </div>
  );
}

export default SearchBot;
