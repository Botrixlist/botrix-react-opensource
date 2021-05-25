import {Router} from 'express';
import users from '../../../models/user';
import bots from '../../../models/bot';
import {userId, user} from '../../../wrappers/discord/user';
import Sanitize from '../../../utils/sanitizeuser';

let route = Router();

route.get("/:id", async (req: any, res: any, next: any) => {
    
    let dbuser = await users.findOne({userid: req.params.id}).cache(30);
    if(!dbuser) return res.json({error: "not found!"}).status(404);

    let userbots;
    if(req.headers.authentication){

        //getting the users unverified bots. so that the public don't see them.
        await user(req.headers.authentication)
        .then(async (res_ : any) => {
            if(res_.id == req.params.id){
                userbots = await bots.find({owners: req.params.id});
            }
        }).catch(async (e) => {
            userbots = await bots.find({owners: req.params.id, state: "verified"});
        })

    } else {
        userbots = await bots.find({owners: req.params.id, state: "verified"});
    }


    let discorduser : any = await userId(req.params.id);
    let userFinal = {...dbuser._doc, ...discorduser, bots: userbots};

    res.json({user: Sanitize(userFinal)});
});

export = route;