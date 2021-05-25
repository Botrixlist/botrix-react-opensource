"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var usersSchema = new mongoose_1.Schema({
    bio: {
        type: String,
        default: "This user has no bio",
    },
    userid: {
        type: String,
        required: true,
    },
    authentication: {
        type: String,
    },
    user_flags: {
        type: Array,
    },
    message_queue: {
        type: Array,
    },
});
exports.default = mongoose_1.model("Users", usersSchema);
