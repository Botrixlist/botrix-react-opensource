//Checks if there is auth, if there is then it will put the req.user.as the auth
//if not then it will leave it as undefinied and continue.

import { user } from "../wrappers/discord/user";

export default function (req: any, res: any, next: any) {
  if (!req.headers.authorization) return next();
  user(req.headers.authorization)
    .then((response: any) => {
      req.user = response;
      next();
    })
    .catch((err) => {
        next();
    });
}
