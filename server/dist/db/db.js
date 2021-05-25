"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("../settings/config");
//because there is no types module for it
var cache = require('mongoose-redis');
function MongoDBInit() {
    mongoose_1.default.connect("mongodb+srv://" + config_1.MONGODB.USER + ":" + config_1.MONGODB.PASS + "@" + config_1.MONGODB.HOST + "/" + config_1.MONGODB.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
        console.log("Logged into database " + config_1.MONGODB.HOST);
    });
    cache(mongoose_1.default, "redis://" + config_1.REDISDB.USER + ":" + config_1.REDISDB.PASS + "@" + config_1.REDISDB.HOST + ":" + config_1.REDISDB.PORT);
}
exports.default = MongoDBInit;
