"use strict";
var express_1 = require("express");
var config_1 = require("../../../settings/config");
var route = express_1.Router();
route.get("/", function (req, res, next) {
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=" + config_1.DISCORD.CLIENT_ID + "&redirect_uri=" + config_1.DISCORD.LOGIN_REDIRECT + "&response_type=code&scope=identify%20guilds");
});
module.exports = route;
