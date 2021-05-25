import { Router } from "express";
import bots from "../../../models/bot";
import softauth from '../../../middleware/softcheck';
import santitize from '../../../utils/sanitizebots';

let route: Router = Router();

route.get("/featured", async (req: any, res: any, next: any) => {
  let featured = await bots
    .find({ state: "verified" })
    .sort({ votes: "descending" })
    .limit(12)
    .cache(10000);
 

  res.json({ bots: await santitize(featured) });
});

route.get("/", async (req: any, res: any, next: any) => {
  if (req.query.page) {
    let page_bots = await bots
      .find({ state: "verified" })
      .limit(req.query.page === 1 ? 10 : req.query.page * 10 * 2)
      .skip(req.query.page === 1 ? 0 : req.query.page * 10)
      .cache(10000);

    res.json({ bots: page_bots });
  }
});

route.get("/:id", softauth, async (req: any, res: any, next: any) => {
  let bot = await bots.findOne({ botid: req.params.id });

  if (!bot) return res.json({ error: "Bot not found!" }).status(404);


  if(!req.user && !bot?.owners?.includes(req.user?.id)) {
    bot = await santitize(bot);
  }


  res.json({ bot: bot });
});

export = route;
