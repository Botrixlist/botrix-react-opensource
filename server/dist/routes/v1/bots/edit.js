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
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var bot_1 = __importDefault(require("../../../models/bot"));
var checkauth_1 = __importDefault(require("../../../middleware/checkauth"));
var user_1 = require("../../../wrappers/discord/user");
var config_1 = require("../../../settings/config");
var discord_js_1 = require("discord.js");
var random_1 = __importDefault(require("../../../utils/random"));
var route = express_1.Router();
/**
 * Sample request:
 *{
    description: "Bots short description",
    long: "Bots long description",
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
route.put("/:id", checkauth_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, sanitizedLong, sanitizedDescription, bot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                sanitizedLong = sanitize_html_1.default(body.long);
                sanitizedDescription = sanitize_html_1.default(body.description);
                return [4 /*yield*/, bot_1.default.findOne({ botid: req.params.id })];
            case 1:
                bot = _a.sent();
                if (!bot)
                    return [2 /*return*/, res.status(404)];
                if (sanitizedDescription.length > 120)
                    return [2 /*return*/, res.status(300).json({ error: "Bot description is too long!" })];
                return [4 /*yield*/, user_1.userId(req.params.id).then(function (check_bot) { return __awaiter(void 0, void 0, void 0, function () {
                        var client, guild, addEmbed;
                        return __generator(this, function (_a) {
                            if (!check_bot)
                                return [2 /*return*/, res.status(300).json({ error: "Client ID Is Invalid!" })];
                            if (check_bot.bot == false)
                                return [2 /*return*/, res.status(300).json({
                                        error: "The client ID you provided belongs to a user!",
                                    })];
                            bot.auth = body.new_auth ? random_1.default(32) : bot.auth;
                            bot.prefix = body.prefix ? body.prefix : bot.prefix;
                            bot.description = body.description ? body.description : bot.description;
                            bot.botLibrary = body.botLibrary ? body.botLibrary : bot.botLibrary;
                            bot.long = body.long ? body.long : bot.long;
                            bot.banner = body.banner ? body.banner : bot.banner;
                            bot.website = body.website ? body.website : bot.website;
                            bot.server = body.server ? body.server : bot.server;
                            bot.owners = body.owners ? body.owners : bot.owners;
                            bot.tags = body.tags ? body.tags : bot.tags;
                            bot.webhook = body.webhook ? body.webhook : bot.webhook;
                            bot.logo = "https://cdn.discordapp.com/avatars/" + bot.botid + "/" + check_bot.avatar + ".png";
                            bot.save();
                            client = req.app.get("client");
                            guild = client.guilds.cache.get(config_1.LOGGING.GUILD_ID);
                            addEmbed = new discord_js_1.MessageEmbed()
                                .setTitle("Bot has been updated")
                                .setAuthor("" + req.user.username)
                                .setDescription(req.user.username + " has updated their bot! \n\nShort link: https://btx.lol/" + bot.botid)
                                .setColor("#7605f0");
                            guild.channels.cache.get(config_1.LOGGING.MOD_LOGS).send(addEmbed);
                            res.json({ done: "updated" });
                            return [2 /*return*/];
                        });
                    }); })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
module.exports = route;
