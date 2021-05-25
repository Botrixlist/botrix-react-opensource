"use strict";
//Checks if there is auth, if there is then it will put the req.user.as the auth
//if not then it will leave it as undefinied and continue.
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../wrappers/discord/user");
function default_1(req, res, next) {
    if (!req.headers.authorization)
        return next();
    user_1.user(req.headers.authorization)
        .then(function (response) {
        req.user = response;
        next();
    })
        .catch(function (err) {
        next();
    });
}
exports.default = default_1;
