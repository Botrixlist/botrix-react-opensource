import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useAxios from "axios-hooks";
import axios from 'axios';
import ErrorPage from "../error";
import { motion } from "framer-motion";
import { Redirect } from "react-router";
import { config } from "../../config";
import Preloader from "../preloader";
import { setNotifacation } from '../../actions/setNotifacation';
import {useDispatch} from 'react-redux';
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ms from 'ms';
import "../../css/vote.scss";

function VotePage(props) {
  let { id } = props.match.params;

  const isLogged = useSelector((state) => state.logged);
  const [redirect, setRedirect] = useState();
  const [pgError, setError] = useState();
  const [submitData, setData] = useState({hcaptcha: ""}); 
  const [bot, setBot] = useState({});
  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const [isAnimating, setAnimation] = useState();
  const dispatch = useDispatch();

  const [{ data, loading, error }, refetch] = useAxios(
    `${config.backend}/v1/get/bots/${id}`
  );

  const captchaSuccess = (t, e) => {
    setData({hcaptcha: t});
  };

  const fallbackLogo = () => {
    setLogo("/default_pfp.png");
  };

  const fallbackBanner = () => {
    setBanner("/default_banner.png");
  };

  const voteForBot = () => {
    axios.post(`${config.backend}/v1/bots/vote/${id}`, {
      hcaptcha: submitData.hcaptcha
    }, {headers: {
      authorization: localStorage.getItem("_dsToken")
    }})
    .then((res) => {
      console.log(res.data);
      if(res.data.error){
        if(res.data.remaining){
          dispatch(setNotifacation({type: "FAILURE", data: `You can only vote every 12 hours! Time remaining:  ${ms(res.data.remaining)}`}));
        }
        dispatch(setNotifacation({type: "FAILURE", data: `Vote Failed.`}));

      } else {
        dispatch(setNotifacation({TYPE: "SUCCESS", data: "Thank you for your vote!"}))
        setRedirect(`/bots/${bot?.botid}`)
      }
    })
  };

  useEffect(() => {
    if (!isLogged) return setRedirect("/login");
  }, [isLogged]);

  useEffect(() => {
    if (data) {
      if (data.error) {
        setError(true);
      } else {
        setBot(data.bot);
        setLogo(data.bot.logo);
        setBanner(data.bot.bannerURL);
      }
    }
  }, [data]);

  if (pgError) return <ErrorPage type={404}></ErrorPage>;
  if (redirect) return <Redirect to={redirect}></Redirect>;
  if (loading) return <Preloader></Preloader>;

  return (
    <>
      <div className="voting-container">
        <img className="bot-banner" src={banner} onError={fallbackBanner}></img>
        <div className="bot">
          <img className="bot-logo" src={logo} onError={fallbackLogo}></img>
          <h1 className="bot-name">{bot?.username}</h1>
          <HCaptcha
            sitekey="b9fbde0b-6cfc-4067-a411-d7bef5a92d72"
            onVerify={(t, e) => captchaSuccess(t, e)}
          />
          <button onClick={() => voteForBot()} className="vote-button">
            Vote!!!
          </button>
        </div>
      </div>

      {isAnimating ? (
        <motion.div
          className="uwu-explosion"
          animate={{
            x: 0,
            y: 0,
            height: "100%",
            width: "100%",
          }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="thanks"
            animate={{ opacity: ["0", "1"] }}
            transition={{ duration: 2 }}
          >
            <h1>Thanks for voting!</h1>
            <p>I'm sure the owner of this bot appretiates you!</p>
          </motion.div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}

export default VotePage;
