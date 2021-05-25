import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { config } from "../../config";
import Item from "./popupItem";
import Error from "../errorMessage";
import "../../css/popup.scss";

function SettingsModal(props) {
  let [tabName, setName] = useState("api");
  let [token, setToken] = useState("*********************************");
  let [buttonText, setText] = useState("Show");
  let [error, setError] = useState(false);

  let changeView = (name) => {
    return setName(name);
  };

  let setTokenState = () => {
    setToken(
      props.auth === token ? "*********************************" : props.auth
    );
    setText(buttonText == "Show" ? "Hide" : "Show");
  };

  let regenerateToken = () => {
    axios
      .put(
        `${config.backend}/v1/bots/edit/${props.id}`,
        {
          new_auth: "true",
        },
        {
          headers: {
            authorization: `${localStorage.getItem("_dsToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.done) {
          props.refetch();
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <div style={{ display: `${props.active ? "block" : "none"}` }}>
      <div
        className="background-blur"
        onClick={() => props.setModalActive()}
      ></div>
      <div className="outer">
        <motion.div
          animate={props.active ? { scale: [0.4, 1], opacity: [0, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="inner"
        >
          <div className="tabs">
            <div
              onClick={() => changeView("webhook")}
              className={`${tabName === "webhook" ? "active" : ""} tab-item`}
            >
              <p>Webhook</p>
            </div>

            <div
              name="api"
              onClick={() => changeView("api")}
              className={`${tabName === "api" ? "active" : ""} tab-item`}
            >
              <p>API</p>
            </div>
          </div>

          <div className="main-content">
            <Item name={"api"} current={tabName}>
              <h3>API Settings</h3>
              <p>API Token</p>
              {error ? (
                <Error
                  reason={
                    "There was an error updating your bot. Try reloading the page."
                  }
                ></Error>
              ) : (
                ""
              )}
              <div className="token-container">
                <p className="token">{token}</p>
                <button className="dsc-button" onClick={setTokenState}>
                  {buttonText}
                </button>
                <button className="dsc-button" onClick={regenerateToken}>
                  Regenerate
                </button>
              </div>
            </Item>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SettingsModal;
