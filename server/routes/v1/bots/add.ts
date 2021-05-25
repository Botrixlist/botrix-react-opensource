import { Router } from "express";
import sanitizeHtml from "sanitize-html";
import bots from "../../../models/bot";
import checkuser from "../../../middleware/checkauth";
import { user, userId } from "../../../wrappers/discord/user";
import { LOGGING } from "../../../settings/config";
import { MessageEmbed } from "discord.js";

let route: Router = Router();

/**
 * Sample request:
 *{
    description: "Bots short description",
    long: "Bots long description",
    id: "Bots client id",
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
route.post("/", checkuser, async (req: any, res: any, next: any) => {
  //preform some checks lel
  let data = req.body;

  console.log(req.user);

  if (!data.id) return res.json({ error: "No bot ID provided!" });
  if (!data.long) return res.json({ error: "No Long description provided!" });
  if (!data.prefix) return res.json({ error: "No prefix provided!" });
  if (!data.server) return res.json({ error: "No server provided!" });
  if (!data.invite) return res.json({ error: "No Invite provided!" });
  if (!data.description) return res.json({ error: "No description provided!" });

  let sanitizedDescription = sanitizeHtml(data.description);
  let sanitizedLong = sanitizeHtml(data.long);
  let owners = [req.user.id, ...data.owners.split(" ")];

  if (sanitizedDescription.length > 120)
    return res.status(300).json({ error: "Bot description is too long!" });

  let botcheck = await bots.findOne({ botid: data.id });

  if (botcheck) return res.json({ error: "Bot is already on this list!" });

  await userId(data.id)
    .then(async (bot: any) => {
      if (!bot) return res.status(300).json({ error: "Client ID not found!" });

      console.log(bot);

      if (bot.bot == false)
        return res.status(300).json({
          error: "The client ID you provided belongs to a user!",
        });

      await new bots({
        botid: data.id,
        prefix: data.prefix,
        description: sanitizedDescription,
        logo: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`,
        username: bot.username,
        botLibrary: data.library,
        invite: data.invite,
        long: sanitizedLong,
        website: data.website,
        support: data.server,
        owners: owners,
        auth: Math.random().toString(16).substr(2, 8),
        botTags: data.tags,
        bannerURL: data.banner,
        webhook: data.webhook,
      }).save(); //thank chu~

      //log in the discord
      let client = req.app.get("client");
      let guild = client.guilds.cache.get(LOGGING.GUILD_ID);

      let addEmbed = new MessageEmbed()
        .setTitle(`New bot submitted!`)
        .setAuthor(`${req.user.username}`)
        .setDescription(
          `${req.user.username} has submitted a new bot invite it [here!](https://discord.com/oauth2/authorize?client_id=${bot.id}&permissions=0&scope=bot)\n\nhttps://btx.lol/${bot.id}`
        )
        .setColor("#7605f0")
        .addField(`Prefix`, `\`${data.prefix}\``)
        .addField(`Made By`, `<@${req.user.id}>`);

      guild.channels.cache.get(LOGGING.MOD_LOGS).send(addEmbed);

      res.status(200).json({ done: "bot listed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: "Bot id not found!" });
    });
});

export = route;
