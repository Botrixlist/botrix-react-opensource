import { Router } from "express";
import { DISCORD } from "../../../settings/config";
let route: Router = Router();

route.get("/", (req, res, next) => {
  res.redirect(
    `https://discord.com/api/oauth2/authorize?client_id=${DISCORD.CLIENT_ID}&redirect_uri=${DISCORD.LOGIN_REDIRECT}&response_type=code&scope=identify%20guilds`
  );
});

export = route;
