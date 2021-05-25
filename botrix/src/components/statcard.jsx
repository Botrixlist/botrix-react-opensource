import React from "react";

function StatsCard(props) {
  return (
    <div className="stats-holder">
      <div className="icon-holder-stats">
        <img src={props.graphic}></img>
      </div>
      <div className="text-holder">
        <p>{props.data}</p>
      </div>
    </div>
  );
}


export default StatsCard;