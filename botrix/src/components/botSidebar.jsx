import React, { useEffect, useState } from "react";
import StatsCard from "./statcard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BotSidebar(props) {
  let [owner, setOwner] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (props.bot && user.id) {
      if (props.bot.owners.includes(user.id)) {
        setOwner(true);
      }
    }
  }, [user]);

  return (
    <div>
      <div className="sidebar-bot">
        {owner ? (
          <div>
            <div>
              <p>Owner Settings</p>
              <Link to={`/bots/${props.bot.botid}/edit`}>
                <StatsCard data={`Edit bot`} graphic={"/edit.png"}></StatsCard>
              </Link>
              <div onClick={() => props.setDeleteModelActive()} to="/edit">
                <StatsCard
                  data={`Delete Bot`}
                  graphic={"/trash.png"}
                ></StatsCard>
              </div>
              <div onClick={() => props.setModalActive()}>
                <StatsCard
                  data={`Manage Bot`}
                  graphic={"/settings.png"}
                ></StatsCard>
              </div>
            </div>
            <br></br>
          </div>
        ) : (
          ""
        )}
        <div>
          <p>Stats</p>
          <StatsCard
            data={`${props.bot.votes ? props.bot.votes : 0} Votes`}
            graphic={"/up-arrow.png"}
          ></StatsCard>
          <StatsCard
            data={`${props.bot.servers} Servers`}
            graphic={"/server.png"}
          ></StatsCard>
        </div>
      </div>
    </div>
  );
}

export default BotSidebar;
