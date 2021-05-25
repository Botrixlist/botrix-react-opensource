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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("express");
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var bot_1 = __importDefault(require("../../../models/bot"));
var checkauth_1 = __importDefault(require("../../../middleware/checkauth"));
var user_1 = require("../../../wrappers/discord/user");
var config_1 = require("../../../settings/config");
var discord_js_1 = require("discord.js");
var route = express_1.Router();
/**
 * Sample request:
 *{
    description: "Bots short description",
    long: "Bots long description",
    id: "Bots client id",
    prefix: "prefix",
    library: "bot library",
    invite: "bot invite",
    website: "bot website",
    server: "support server",
    owners: "array of additional owners",
    tags: "bot tags",
    banner: "banner url",
    webhook: "webhook URL"
 }
 */
route.post("/", checkauth_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, sanitizedDescription, sanitizedLong, owners, botcheck;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                console.log(req.user);
                if (!data.id)
                    return [2 /*return*/, res.json({ error: "No bot ID provided!" })];
                if (!data.long)
                    return [2 /*return*/, res.json({ error: "No Long description provided!" })];
                if (!data.prefix)
                    return [2 /*return*/, res.json({ error: "No prefix provided!" })];
                if (!data.server)
                    return [2 /*return*/, res.json({ error: "No server provided!" })];
                if (!data.invite)
                    return [2 /*return*/, res.json({ error: "No Invite provided!" })];
                if (!data.description)
                    return [2 /*return*/, res.json({ error: "No description provided!" })];
                sanitizedDescription = sanitize_html_1.default(data.description);
                sanitizedLong = sanitize_html_1.default(data.long);
                owners = __spreadArrays([req.user.id], data.owners.split(" "));
                if (sanitizedDescription.length > 120)
                    return [2 /*return*/, res.status(300).json({ error: "Bot description is too long!" })];
                return [4 /*yield*/, bot_1.default.findOne({ botid: data.id })];
            case 1:
                botcheck = _a.sent();
                if (botcheck)
                    return [2 /*return*/, res.json({ error: "Bot is already on this list!" })];
                return [4 /*yield*/, user_1.userId(data.id)
                        .then(function (bot) { return __awaiter(void 0, void 0, void 0, function () {
                        var client, guild, addEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!bot)
                                        return [2 /*return*/, res.status(300).json({ error: "Client ID not found!" })];
                                    console.log(bot);
                                    if (bot.bot == false)
                                        return [2 /*return*/, res.status(300).json({
                                                error: "The client ID you provided belongs to a user!",
                                            })];
                                    return [4 /*yield*/, new bot_1.default({
                                            botid: data.id,
                                            prefix: data.prefix,
                                            description: sanitizedDescription,
                                            logo: "https://cdn.discordapp.com/avatars/" + bot.id + "/" + bot.avatar + ".png",
                                            username: bot.username,
                                            botLibrary: data.library,
                                            invite: data.invite,
                                            long: sanitizedLong,
                                            website: data.website,
                                            support: data.server,
                                            owners: owners,
                                            auth: Math.random().toString(16).substr(2, 8),
                                            botTags: data.tags,
                                            bannerURL: data.banner,
                                            webhook: data.webhook,
                                        }).save()];
                                case 1:
                                    _a.sent(); //thank chu~
                                    client = req.app.get("client");
                                    guild = client.guilds.cache.get(config_1.LOGGING.GUILD_ID);
                                    addEmbed = new discord_js_1.MessageEmbed()
                                        .setTitle("New bot submitted!")
                                        .setAuthor("" + req.user.username)
                                        .setDescription(req.user.username + " has submitted a new bot invite it [here!](https://discord.com/oauth2/authorize?client_id=" + bot.id + "&permissions=0&scope=bot)\n\nhttps://btx.lol/" + bot.id)
                                        .setColor("#7605f0")
                                        .addField("Prefix", "`" + data.prefix + "`")
                                        .addField("Made By", "<@" + req.user.id + ">");
                                    guild.channels.cache.get(config_1.LOGGING.MOD_LOGS).send(addEmbed);
                                    res.status(200).json({ done: "bot listed" });
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        console.log(err);
                        res.status(404).json({ error: "Bot id not found!" });
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
module.exports = route;
