import React, { useState } from "react";
import Preloader from "../preloader";
import Input from "./components/input";
import TagInput from "./components/tags";
import axios from "axios";
import { config } from "../../config";
import { Redirect } from "react-router-dom";

function AddForm() {
  let [data, setData] = useState({
    botID: "",
    prefix: "",
    description: "",
    server: "",
    website: "",
    invite: "",
    library: "",
    webhook: "",
    long: "",
    owners: "",
  });

  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  const submitHandeler = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        `${config.backend}/v1/bots/add`,
        {
          id: data.botID,
          prefix: data.prefix,
          description: data.description,
          library: data.library,
          invite: data.invite,
          owners: data.owners,
          long: data.long,
          webhook: data.webhook,
          banner: "",
          server: data.server,
          tags: [],
        },
        {
          headers: {
            authorization: localStorage.getItem("_dsToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          setLoading(false);
          setError(res.data.err);
        }

        if (res.data.done) {
          return <Redirect to={`/bots/${data.botID}`}></Redirect>;
        }
      })
      .catch((err) => {
        if (err.response.data) {
          setError(err.response.data.error);
          setLoading(false);
        }
      });
    console.log(data);
  };

  if (loading) return <Preloader></Preloader>;

  return (
    <div>
      <form onSubmit={submitHandeler}>
        <p style={{ color: "red" }}>{error !== "" ? error : ""}</p>

        <Input
          onChange={(e) => setData({ ...data, botID: e.target.value })}
          value={data.botID}
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
          onChange={(e) => setData({ ...data, server: e.target.value })}
          value={data.server}
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
          onChange={(e) => setData({ ...data, library: e.target.value })}
          value={data.library}
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

        <TagInput></TagInput>

        <button type="submit" className="submit-button">
          Submit Bot!
        </button>
      </form>
    </div>
  );
}

export default AddForm;
