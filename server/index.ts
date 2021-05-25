import dotenv from 'dotenv';
import express from "express";
import loadRoutes from "./utils/loadRoutes";
import mongodb from "./db/db";
import cors from "cors";
import parser from "body-parser";
import webhook from './utils/webhook';
import embed from './utils/discord/embed';
import discord from "discord.js";
import { BOT } from "./settings/config";

dotenv.config();

var app: any = express();
var client: discord.Client = new discord.Client();

client.on("ready", () => {
  console.log("Bot has logged in");
});

app.use(cors());
app.use(
  parser({
    extended: false,
  })
);
app.set("client", client);

loadRoutes(app);

mongodb();

app.use(express.json());

app.use("/teapot", (req : any, res : any, next : any) => {
  res.json({teapot: "I am a teapot.", code: 418}).status(418)
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is online!");
  client.login(BOT.TOKEN);
});
