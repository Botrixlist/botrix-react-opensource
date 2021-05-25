"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("redis"));
var config_1 = require("../settings/config");
function RedisDBInit() {
    return redis_1.default.createClient({
        host: config_1.REDISDB.HOST,
        port: config_1.REDISDB.PORT
    });
}
exports.default = RedisDBInit;
