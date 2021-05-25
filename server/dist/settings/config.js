"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VOTE_TIMEOUT = exports.HCAPTCHA_SECRET = exports.CACHEOPTIONS = exports.OWNER_OPTIONS = exports.LOGGING = exports.EMBED_SETTINGS = exports.DISCORD = exports.REDISDB = exports.BOT = exports.MONGODB = exports.PROD_FRONTEND = exports.PROD_BASE = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PROD_BASE = "https://api.btx.lol";
exports.PROD_FRONTEND = "https://brx-development-build.netlify.app";
exports.MONGODB = {
    HOST: "botrix.7ddun.mongodb.net",
    USER: "Admin",
    PASS: "btxbotrix1234",
    PORT: 27017,
    DATABASE: "test",
};
exports.BOT = {
    PREFIX: ".",
    TOKEN: "NjUzMTE1MDgwMjY2ODc0ODgx.XeyS0Q.CwqRCJaXMUNHNbte8eB40Yb2jZw",
};
exports.REDISDB = {
    HOST: "containers-us-west-5.railway.app",
    PASS: "vEGJNzkxc1BdEZBR36lGpw==",
    USER: "root",
    PORT: 7319,
};
exports.DISCORD = {
    API_ENDPOINT: "https://discord.com/api/",
    CLIENT_SECRET: "fyNv70ew2p8Dpf766h0jnfk7HMYyurUk",
    CLIENT_ID: "653115080266874881",
    LOGIN_REDIRECT: (process.env.debug == "true" ? "http://localhost:3001" : exports.PROD_BASE) + "/v1/oauth/callback",
    WEB_LOGS_WEBHOOK: "https://discord.com/api/webhooks/805286062968406026/JzwGT9tDK1s_tlvaZmo11DSQrlAq_Y0Z1xTSdwGIDakVHwoFiQPJjb34-xLC7eW3IfKD",
};
exports.EMBED_SETTINGS = {
    color: "#7605f0",
    error: "",
    warning: ""
};
exports.LOGGING = {
    GUILD_ID: "721282458708082713",
    MOD_LOGS: "747393960116355123",
    VOTE_LOGS: "748497181056434227"
};
exports.OWNER_OPTIONS = {
    OWNER_ID: "216852520088109056",
};
exports.CACHEOPTIONS = {
    TTL: 60,
};
exports.HCAPTCHA_SECRET = "0xC32Dc9319497c6a37189633a2fDb9ffFc2833503";
exports.VOTE_TIMEOUT = 43200000; //12 hours 
