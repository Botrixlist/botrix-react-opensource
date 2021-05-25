import { Router, Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";
import bots from "../../../models/bot";
import checkauth from "../../../middleware/checkauth";
import { userId } from "../../../wrappers/discord/user";
import { LOGGING } from "../../../settings/config";
import { MessageEmbed } from "discord.js";
import random from "../../../utils/random";

var route = Router();

/**
 * Sample request:
 *{
    description: "Bots short description",
    long: "Bots long description",
    prefix: "prefix",
    library: "bot library",
    invite: "bot invite",
    website: "bot website",
    server: "support server",
    owners: "array of additional owners",
    tags: "bot tags",
    banner: "banner url",
    webhook: "webhook URL"
 }
 */
route.put(
  "/:id",
  checkauth,
  async (req: any, res: Response, next: NextFunction) => {
    let body = req.body;

    let sanitizedLong = sanitizeHtml(body.long);
    let sanitizedDescription = sanitizeHtml(body.description);

    let bot = await bots.findOne({ botid: req.params.id });

    if (!bot) return res.status(404);

    if (sanitizedDescription.length > 120)
      return res.status(300).json({ error: "Bot description is too long!" });

    await userId(req.params.id).then(async (check_bot: any) => {
      if (!check_bot)
        return res.status(300).json({ error: "Client ID Is Invalid!" });

      if (check_bot.bot == false)
        return res.status(300).json({
          error: "The client ID you provided belongs to a user!",
        });

      bot.auth = body.new_auth ? random(32) : bot.auth;
      bot.prefix = body.prefix ? body.prefix : bot.prefix;
      bot.description = body.description ? body.description : bot.description;
      bot.botLibrary = body.botLibrary ? body.botLibrary : bot.botLibrary;
      bot.long = body.long ? body.long : bot.long;
      bot.banner = body.banner ? body.banner : bot.banner;
      bot.website = body.website ? body.website : bot.website;
      bot.server = body.server ? body.server : bot.server;
      bot.owners = body.owners ? body.owners : bot.owners;
      bot.tags = body.tags ? body.tags : bot.tags;
      bot.webhook = body.webhook ? body.webhook : bot.webhook;
      bot.logo = `https://cdn.discordapp.com/avatars/${bot.botid}/${check_bot.avatar}.png`;

      bot.save();

      //log in the discord
      let client = req.app.get("client");
      let guild = client.guilds.cache.get(LOGGING.GUILD_ID);

      let addEmbed = new MessageEmbed()
        .setTitle(`Bot has been updated`)
        .setAuthor(`${req.user.username}`)
        .setDescription(
          `${req.user.username} has updated their bot! \n\nShort link: https://btx.lol/${bot.botid}`
        )
        .setColor("#7605f0");

      guild.channels.cache.get(LOGGING.MOD_LOGS).send(addEmbed);

      res.json({ done: "updated" });
    });
  }
);

export = route;
