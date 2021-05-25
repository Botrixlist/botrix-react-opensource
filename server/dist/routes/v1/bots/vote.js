"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("express");
var bot_1 = __importDefault(require("../../../models/bot"));
var checkauth_1 = __importDefault(require("../../../middleware/checkauth"));
var votes_1 = __importDefault(require("../../../models/votes"));
var axios_1 = __importDefault(require("axios"));
var querystring_1 = __importDefault(require("querystring"));
var webhook_1 = __importDefault(require("../../../utils/webhook"));
var embed_1 = __importDefault(require("../../../utils/discord/embed"));
var discord_js_1 = require("discord.js");
var config_1 = require("../../../settings/config");
var route = express_1.Router();
//nya senpai~ 
//mmm your dick is so hard!
route.post("/:id", checkauth_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hres, bot, vote, now, webhookEmbed, client, guild, voteEmbed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.hcaptcha)
                    return [2 /*return*/, res.json({ error: "Invalid hcpatcha response code!" })];
                return [4 /*yield*/, axios_1.default.post("https://hcaptcha.com/siteverify", querystring_1.default.stringify({
                        response: req.body.hcaptcha,
                        secret: config_1.HCAPTCHA_SECRET
                    })).catch(function (e) {
                        console.log(e.response.data);
                        res.json({ error: "Error contacting hcaptcha for siteverify" }).status(500);
                    })];
            case 1:
                hres = _a.sent();
                if (!hres.data.success)
                    return [2 /*return*/, res.json({ error: "HCaptcha error." }).status(403)];
                return [4 /*yield*/, bot_1.default.findOne({ botid: req.params.id })];
            case 2:
                bot = _a.sent();
                if (!bot)
                    return [2 /*return*/, res.json({ error: "Bot not found." }).status(404)];
                return [4 /*yield*/, votes_1.default.find({ user_id: req.user.id }).sort({ date: 1 })];
            case 3:
                vote = _a.sent();
                now = Date.now();
                if (vote.length == 0 || (now - vote[0].date) - config_1.VOTE_TIMEOUT < 0) {
                    bot.votes += 1;
                    new votes_1.default({
                        user_id: req.user.id,
                        bot_id: bot.botid,
                        time: Date.now()
                    }).save();
                    bot.save();
                    if (bot.webhook !== "none" || !bot.webhook) {
                        webhookEmbed = new embed_1.default()
                            .setTitle(req.user.username + " has voted for " + bot.username + "!")
                            .setColor(config_1.EMBED_SETTINGS.color);
                        webhook_1.default(bot.webhook, "", webhookEmbed);
                    }
                    client = req.app.get("client");
                    guild = client.guilds.cache.get(config_1.LOGGING.GUILD_ID);
                    voteEmbed = new discord_js_1.MessageEmbed()
                        .setTitle(req.user.username + " has voted for " + bot.username + "!")
                        .setDescription(bot.username + " now has " + bot.votes)
                        .setColor(config_1.EMBED_SETTINGS.color);
                    guild.channels.cache.get(config_1.LOGGING.VOTE_LOGS).send(voteEmbed);
                    res.json({ done: "success" }).status(201);
                }
                else {
                    res.json({ error: "You can only vote every 12 hours!", remaining: config_1.VOTE_TIMEOUT - (Date.now() - vote[0].time) });
                }
                return [2 /*return*/];
        }
    });
}); });
module.exports = route;
