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
var dotenv_1 = __importDefault(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
var config_1 = require("../../../settings/config");
var querystring_1 = __importDefault(require("querystring"));
var user_1 = __importDefault(require("../../../models/user"));
dotenv_1.default.config();
var route = express_1.Router();
route.get("/", function (req, res, next) {
    if (!req.query.code)
        res.redirect("/login");
    var data = {
        client_id: config_1.DISCORD.CLIENT_ID,
        client_secret: config_1.DISCORD.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: config_1.DISCORD.LOGIN_REDIRECT,
        scope: "identify guilds",
    };
    axios_1.default
        .post("https://discord.com/api/oauth2/token", querystring_1.default.stringify(data), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then(function (res_) { return __awaiter(void 0, void 0, void 0, function () {
        var json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, res_.data];
                case 1:
                    json = _a.sent();
                    //callback hell
                    return [4 /*yield*/, axios_1.default
                            .get("https://discord.com/api/v8/users/@me", {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + json.access_token,
                            },
                        })
                            .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                            var data, user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        data = res.data;
                                        return [4 /*yield*/, user_1.default.findOne({ userid: data.id })];
                                    case 1:
                                        user = _a.sent();
                                        if (!user) {
                                            new user_1.default({
                                                userid: data.id,
                                                username: data.username,
                                                user_flags: [],
                                            }).save();
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (e) {
                            console.log(e);
                        })];
                case 2:
                    //callback hell
                    _a.sent();
                    res.redirect((process.env.debug === "true" ? "http://localhost:3000/callback/" : config_1.PROD_FRONTEND + "/callback/") +
                        json.access_token +
                        "/" +
                        json.refresh_token);
                    return [2 /*return*/];
            }
        });
    }); })
        .catch(function (err) {
        console.log(err);
    });
});
module.exports = route;
