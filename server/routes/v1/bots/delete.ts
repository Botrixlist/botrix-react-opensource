import { Router } from 'express';
import { MessageEmbed } from 'discord.js';
import { LOGGING } from '../../../settings/config';
import checkauth from '../../../middleware/checkauth';
import bots from '../../../models/bot';

let route = Router();

route.delete("/:id", checkauth, async (req : any, res, next) => {

    let bot = await bots.findOne({botid: req.params.id});
    if(!bot) return res.json({error: "Bot not found!"});
    if(!bot.owners.includes(req.user.id)) return res.json({error: "You are not the owner of this bot!"});
    
    await bots.deleteOne({botid: bot.botid});

    //discord logging shit
    let client = req.app.get("client");
    let channel = client.guilds.cache.get(LOGGING.GUILD_ID).channels.cache.get(LOGGING.MOD_LOGS);

    let deleteEmbed = new MessageEmbed()
        .setTitle(`${req.user.username} has deleted ${bot.username}!`)
        .setColor("#7605f0");

    channel.send(deleteEmbed);    

    return res.json({done: "Bot has been deleted."});
});

export = route;