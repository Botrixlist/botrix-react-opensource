"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../wrappers/discord/user");
function default_1(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json({ error: "Unauthorized!" }).end();
    user_1.user(req.headers.authorization)
        .then(function (response) {
        if (!response.id)
            return res.status(403).json({ error: "Credentials invalid!" }).end();
        req.user = response;
        next();
    })
        .catch(function (err) {
        res.status(403).end();
    });
}
exports.default = default_1;
