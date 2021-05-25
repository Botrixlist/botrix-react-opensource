import { Router } from "express";
import dotenv from 'dotenv';
import axios from "axios";
import { DISCORD, PROD_FRONTEND } from "../../../settings/config";
import qs from "querystring";
import users from "../../../models/user";

dotenv.config();

let route: Router = Router();

route.get("/", (req: any, res: any, next: any) => {
  if (!req.query.code) res.redirect("/login");

  let data = {
    client_id: DISCORD.CLIENT_ID,
    client_secret: DISCORD.CLIENT_SECRET,
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: DISCORD.LOGIN_REDIRECT,
    scope: "identify guilds",
  };

  axios
    .post("https://discord.com/api/oauth2/token", qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(async (res_) => {
      let json = await res_.data;

      //callback hell
      await axios
        .get("https://discord.com/api/v8/users/@me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + json.access_token,
          },
        })
        .then(async (res) => {
          let data = res.data;
          let user = await users.findOne({ userid: data.id });

          if (!user) {
            new users({
              userid: data.id,
              username: data.username,
              user_flags: [],
            }).save();
          }
        })
        .catch((e) => {
          console.log(e);
        });

      res.redirect(
        (process.env.debug ==="true" ? "http://localhost:3000/callback/" : `${PROD_FRONTEND}/callback/`) +
          json.access_token +
          "/" +
          json.refresh_token
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

export = route;
