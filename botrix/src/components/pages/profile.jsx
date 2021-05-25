import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { config } from "../../config";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import Preloader from "../preloader";
import BotCard from "../card";
import "../../css/profile.scss";
import axios from "axios";

function ProfilePage(props) {
  let { id } = props.match.params;

  const loggedInUser = useSelector((state) => state.user);
  const isLogged = useSelector((state) => state.logged);

  let [user, setUser] = useState();
  let [bots, setBots] = useState();
  let [isEditing, setEditing] = useState();
  let [loading, setLoading] = useState(true);

  let editProfile = () => {
    setEditing(!isEditing);
  };

  useEffect(() => {
    if (id == "me" && !isLogged) return <Redirect to="/login"></Redirect>;

    axios
      .get(
        `${config.backend}/v1/users/get/${id === "me" ? loggedInUser.id : id}`
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
        setBots(res.data.user.bots[0]);
        console.log(bots);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isLogged]);

  if (loading || !user) return <Preloader></Preloader>;

  return (
    <div>
      <motion.div
        animate={isEditing ? { height: 500 } : {}}
        className="container-centered"
      >
        <div className="edit-button">
          <img src={"/edit.svg"} onClick={editProfile}></img>
        </div>
        <div className="user-container">
          <div className="img-holder">
            <img src={user?.avatar}></img>
          </div>
          <div className="username-holder">
            <h1>
              {user?.username}
              <span>#{user?.tag}</span>
            </h1>
            <p className="side-admin">
              {user?.flags?.includes("ADMIN") ? "Site Admin" : ""}
            </p>
          </div>
          <div className="badge-holder">
            {user?.flags.map((flag) => {
              if (getBadge(flag) !== false) {
                return (
                  <div className={`${flag === "ADMIN" ? "special" : ""} badge`}>
                    <p>{getBadge(flag)}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </motion.div>

      <div className="bot-container">
        <h3>{user?.username}'s Bots.</h3>
        <div className="inner">
          {bots?.map((bot) => {
            return (
              <BotCard
                bannerURL={bot.bannerURL}
                username={bot.username}
                icon={bot.logo}
                votes={bot.votes}
                servers={bot.servers}
                description={bot.description}
                botid={bot.botid}
              ></BotCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getBadge(flag) {
  switch (flag) {
    case "ADMIN":
      return "Admin";
    case "LISTED_DEVELOPER":
      return "Bot Developer";
    case "DEV":
      return "Site Developer";
    case "RETARD":
      return "Gay boi";
    default:
      return false;
  }
}

export default ProfilePage;
