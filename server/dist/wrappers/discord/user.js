"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userId = exports.user = void 0;
var axios_1 = __importDefault(require("axios"));
var config_1 = require("../../settings/config");
function user(token) {
    return new Promise(function (resolve, reject) {
        axios_1.default
            .get("https://discord.com/api/v8/users/@me", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        })
            .then(function (res) {
            resolve(res.data);
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
exports.user = user;
function userId(id) {
    return new Promise(function (resolve, reject) {
        axios_1.default
            .get("https://discord.com/api/v8/users/" + id, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bot " + config_1.BOT.TOKEN,
            },
        })
            .then(function (res) {
            resolve(res.data);
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
exports.userId = userId;
