"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var votesSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
    },
    bot_id: {
        type: String,
    },
    time: {
        type: Number,
    },
});
exports.default = mongoose_1.model("Votes", votesSchema);
