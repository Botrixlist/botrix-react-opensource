import { Router } from "express";
import bots from "../../../models/bot";

let route: Router = Router();

route.get("/", async (req: any, res: any, next: any) => {
  if (!req.query.query) return res.json({ error: "no query paramater" });

  let result = await bots
    .find({
      username: {
        $regex: new RegExp(req.query.query),
      },
    })
    .limit(10)
    .map((bot: any) => {
      delete bot["webhook"];
      return bot;
    });

  return res.json({
    queryLength: result.length,
    result: result,
  });
});

export = route;
