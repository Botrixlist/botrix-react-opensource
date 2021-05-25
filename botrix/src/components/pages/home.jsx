import React, { useState, useEffect } from "react";
import { getBots } from "../../wrappers/botrix/bots";
import useAxios from "axios-hooks";
import Preloader from "../preloader";
import Header from "../headers/mainHeader";
import BotCard from "../card";
import { config } from "../../config";

/* im starting to convert everything over to functions instead of class based conponetnets */
function HomeComponent() {
  const [{ data, loading, error }, refetch] = useAxios(
    `${config.backend}/v1/get/bots/featured`
  );

  const [botArray, setBots] = useState([]);

  useEffect(() => {
    if (data) {
      setBots(data.bots);
    }
  }, [data, error]);

  if (loading) return <Preloader></Preloader>;
  if (error) return <p>API ERROR!</p>;

  console.log(botArray);

  return (
    <div className="main-content">
      <Header></Header>

      <div className="card-arrays">
        <h1>Top Bots: </h1>
        {botArray.map((bot, key) => {
          return (
            <BotCard
              key={`${bot.username}_${key}`}
              botid={bot.botid}
              username={bot.username}
              bannerURL={bot.bannerURL}
              icon={bot.logo}
              id={bot.id}
              votes={bot.votes}
              servers={bot.servers ? bot.servers : 0}
              description={bot.description}
            ></BotCard>
          );
        })}
      </div>
    </div>
  );
}

export default HomeComponent;
