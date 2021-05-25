"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
function send(url, message, embed) {
    return new Promise(function (resolve, reject) {
        axios_1.default.post(url, {
            content: "",
            tts: false,
            embeds: [embed.embed]
        }, {
            headers: {
                "Content-type": "application/json"
            }
        }).then(function (res) {
            resolve(res.data);
        }).catch(function (err) {
            reject(err);
            console.log(err.response.data);
        });
    });
}
exports.default = send;
