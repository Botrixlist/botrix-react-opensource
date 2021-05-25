import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { config } from "../../config.js";
import { Redirect } from "react-router-dom";
import "../../css/popup.scss";

function DeleteModel(props) {
  let [result, setResult] = useState();

  let deleteBot = () => {
    axios
      .delete(`${config.backend}/v1/bots/delete/${props.bot.botid}`, {
        headers: {
          authorization: `${localStorage.getItem("_dsToken")}`,
        },
      })
      .then((res) => {
        setResult(res);
      })
      .catch((e) => {});
  };

  if (result?.data?.done) return <Redirect to="/"></Redirect>;

  return (
    <div style={{ display: props.active ? "block" : "none" }}>
      <div
        className="background-blur"
        onClick={() => props.setModelActive()}
      ></div>

      <div className="outer">
        <motion.div
          animate={
            props.active ? { scale: [0.4, 1], opacity: [0, 1], y: "-20%" } : {}
          }
          transition={{ duration: 0.3 }}
        >
          <div className="delete-inner">
            <div className="main-content">
              <p className="heading">Hey There!</p>
              <p>
                This action is perminent, do not come crying back saying you
                want your bot page back. Deleting your bot will delete all of
                your bots data.
              </p>

              <div className="select-boxes">
                <button onClick={() => props.setModelActive()}>
                  noo take me back
                </button>
                <button onClick={deleteBot} className="red">
                  Lets burn this bitch to the ground
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DeleteModel;
