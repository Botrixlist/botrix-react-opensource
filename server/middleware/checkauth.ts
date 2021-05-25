import { user } from "../wrappers/discord/user";

export default function (req: any, res: any, next: any) {
  if (!req.headers.authorization) return res.status(401).json({error: "Unauthorized!"}).end();
  user(req.headers.authorization)
    .then((response: any) => {
      if(!response.id) return res.status(403).json({error: "Credentials invalid!"}).end();
      req.user = response;
      next();
    })
    .catch((err) => {
      res.status(403).end();
    });
}
