"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var loadRoutes_1 = __importDefault(require("./utils/loadRoutes"));
var db_1 = __importDefault(require("./db/db"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var discord_js_1 = __importDefault(require("discord.js"));
var config_1 = require("./settings/config");
dotenv_1.default.config();
var app = express_1.default();
var client = new discord_js_1.default.Client();
client.on("ready", function () {
    console.log("Bot has logged in");
});
app.use(cors_1.default());
app.use(body_parser_1.default({
    extended: false,
}));
app.set("client", client);
loadRoutes_1.default(app);
db_1.default();
app.use(express_1.default.json());
app.use("/teapot", function (req, res, next) {
    res.json({ teapot: "I am a teapot.", code: 418 }).status(418);
});
app.listen(process.env.PORT || 3001, function () {
    console.log("Server is online!");
    client.login(config_1.BOT.TOKEN);
});
