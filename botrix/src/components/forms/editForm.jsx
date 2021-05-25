import React, { useEffect, useState } from "react";
import Input from "./components/input";
import { useDispatch } from 'react-redux';
import { setNotifacation } from '../../actions/setNotifacation';
import axios from "axios";
import { config } from "../../config";
import { Redirect } from "react-router-dom";
import Preloader from "../preloader";
import ErrorMessage from "../errorMessage";

function EditForm(props) {

  const dispatch = useDispatch();

  let [data, setData] = useState({
    botID: "",
    prefix: "",
    server: "",
    website: "",
    owners: "",
    description: "",
    invite: "",
    library: "",
    webhook: "",
    long: "",
  });

  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.bot) {
      setData(props.bot);
    }
  }, props.bot);

  let submitHandeler = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .put(`${config.backend}/v1/bots/edit/${data.botid}`, data, {
        headers: {
          authorization: `${localStorage.getItem("_dsToken")}`,
        },
      })
      .then((res) => {
        if (res.data.error) {
          setLoading(false);
          setError(res?.data?.error);
        }

        if (res.data.done) {
          setLoading(false);
          dispatch(setNotifacation({data: "You have updated " + data.username, type: "SUCCESS", expire: 10000}));
          return <Redirect to={`/bots/${data.botid}`}></Redirect>;
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.error);
        console.log(err);
      });
  };

  if (loading) return <Preloader></Preloader>;

  return (
    <div>
      <form onSubmit={submitHandeler}>
        {error ? <ErrorMessage reason={error}></ErrorMessage> : ""}

        <Input
          onChange={(e) => setData({ ...data, botid: e.target.value })}
          value={data.botid}
          placeholder="Bot ID"
          required={true}
          requirements={["Your bots client ID"]}
        ></Input>
        <Input
          onChange={(e) => setData({ ...data, prefix: e.target.value })}
          value={data.prefix}
          placeholder="Prefix"
          required={true}
          requirements={["Prefix of your bot"]}
        ></Input>
        <Input
          onChange={(e) => setData({ ...data, description: e.target.value })}
          value={data.description}
          placeholder="What does your bot do?"
          required={true}
          requirements={[
            "Give us a short description of your bot",
            "It must be shorter than 150 chars",
          ]}
        ></Input>
        <Input
          onChange={(e) => setData({ ...data, support: e.target.value })}
          value={data.support}
          placeholder="Support server"
          required={true}
          requirements={[
            "I mean come on, you must beable to provide support for your bot. Right?",
          ]}
        ></Input>
        <Input
          onChange={(e) => setData({ ...data, website: e.target.value })}
          value={data.website}
          placeholder="Website"
          required={false}
          requirements={[
            "Could be your website, or your friends. Or just leave it blank whatever.",
          ]}
        ></Input>
        <Input
          onChange={(e) => setData({ ...data, owners: e.target.value })}
          value={data.owners}
          placeholder="Additional Owners ID"
          required={false}
          requirements={[
            "Additional Owners id's Seperate with spaces",
            "DO NOT PUT YOUR OWN ID!",
          ]}
        ></Input>
        <Input
          onChange={(e) => setData({ ...data, invite: e.target.value })}
          value={data.invite}
          placeholder="Invite Link"
          required={true}
          requirements={["Your bots invite link, duh. "]}
        ></Input>
        <Input
          onChange={(e) => setData({ ...data, botLibrary: e.target.value })}
          value={data.botLibrary}
          placeholder="Bot Library"
          required={false}
          requirements={[
            "The library of your bot (example: Discord.js, Discord.py, Serenity)",
          ]}
        ></Input>
        <Input
          onChange={(e) => setData({ ...data, webhook: e.target.value })}
          value={data.webhook}
          placeholder="Webhook URL"
          required={false}
          requirements={[
            "Your discord webhook URL, sowwy only discord URLS supported atm",
          ]}
        ></Input>
        <div className="description">
          <p style={{ textAlign: "left", marginLeft: `16%`, marginTop: 30 }}>
            Long Description:{" "}
          </p>
          <textarea
            onChange={(e) => setData({ ...data, long: e.target.value })}
            value={data.long}
          ></textarea>
          <div className="requirements">
            <p className="text-requirements">- This is your long description</p>
            <p className="text-requirements">
              - It can contain markdown and html :3
            </p>
            <p className="text-requirements">- This field is required!</p>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Submit Bot!
        </button>
      </form>
    </div>
  );
}

export default EditForm;
