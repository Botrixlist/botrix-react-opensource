import { Router } from "express";
import bots from "../../../models/bot";
import checkauth from '../../../middleware/checkauth';
import votes from "../../../models/votes";
import axios, { AxiosResponse } from 'axios';
import qs from 'querystring';
import Webhook from '../../../utils/webhook';
import Embed from '../../../utils/discord/embed';
import { MessageEmbed } from 'discord.js';
import { VOTE_TIMEOUT, HCAPTCHA_SECRET, EMBED_SETTINGS, LOGGING } from '../../../settings/config';

let route: Router = Router();


//nya senpai~ 
//mmm your dick is so hard!
route.post("/:id", checkauth, async (req: any, res: any, next: any) => {
    
    if(!req.body.hcaptcha) return res.json({error: "Invalid hcpatcha response code!"});

    let hres : any = await axios.post("https://hcaptcha.com/siteverify", qs.stringify({
        response: req.body.hcaptcha,
        secret: HCAPTCHA_SECRET
    })).catch((e) => {
        console.log(e.response.data);
        res.json({error: "Error contacting hcaptcha for siteverify"}).status(500);
    });


    if(!hres.data.success) return res.json({error: "HCaptcha error."}).status(403);
    
    let bot = await bots.findOne({botid: req.params.id});

    if(!bot) return res.json({error: "Bot not found."}).status(404);

    let vote = await votes.find({user_id: req.user.id}).sort({date: 1});

    let now = Date.now();


    if(vote.length == 0 ||  (now - vote[0].date) - VOTE_TIMEOUT < 0){
    
        bot.votes += 1;
        new votes({
            user_id: req.user.id,
            bot_id: bot.botid,
            time: Date.now()
        }).save();

        bot.save();


        if(bot.webhook !== "none" || !bot.webhook){
            let webhookEmbed = new Embed()
                .setTitle(`${req.user.username} has voted for ${bot.username}!`)
                .setColor(EMBED_SETTINGS.color);

            Webhook(bot.webhook, "", webhookEmbed)
        }
        
        //discord logging shtuff  
        let client = req.app.get("client");
        let guild = client.guilds.cache.get(LOGGING.GUILD_ID);

        let voteEmbed = new MessageEmbed()
            .setTitle(`${req.user.username} has voted for ${bot.username}!`)
            .setDescription(`${bot.username} now has ${bot.votes}`)
            .setColor(EMBED_SETTINGS.color);

        guild.channels.cache.get(LOGGING.VOTE_LOGS).send(voteEmbed);

        res.json({done: "success"}).status(201);
    } else {
        res.json({error: "You can only vote every 12 hours!", remaining: VOTE_TIMEOUT - (Date.now() - vote[0].time)});
    }
    
});

export = route;