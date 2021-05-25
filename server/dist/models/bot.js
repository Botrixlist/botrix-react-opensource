"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var botsSchema = new mongoose_1.Schema({
    addedAt: {
        default: function () { return new Date(); },
        type: Date,
    },
    username: {
        type: String,
        required: true,
    },
    botid: {
        type: String,
        required: true,
        unique: true,
    },
    botTags: {
        type: Array,
        required: false,
    },
    botLibrary: {
        type: String,
        required: false,
    },
    certified: {
        type: String,
        required: false,
        default: "unverified",
    },
    votes: {
        type: Number,
        required: false,
        default: 0,
    },
    usersVoted: {
        type: Array,
        required: false,
        default: [],
    },
    logo: {
        type: String,
        required: true,
    },
    invite: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    long: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
        default: "unverified",
    },
    website: {
        type: String,
        required: false,
    },
    support: {
        type: String,
        required: true,
    },
    owners: {
        type: Array,
        required: true,
    },
    auth: {
        type: String,
    },
    servers: {
        type: Number,
        default: 0,
    },
    shards: {
        type: Number,
        default: 0,
    },
    users: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    nsfw: {
        type: Boolean,
        default: false,
    },
    bannerURL: {
        type: String,
        default: "https://cdn.discordapp.com/attachments/735022938419363891/754635158958768138/wp4462550.png",
    },
    webhook: {
        type: String,
        default: "none",
    },
    badges: {
        type: Array,
    },
    themeColor: {
        type: String,
    },
    backgroundColor: {
        type: String,
    },
    api_banned: {
        type: Boolean,
        default: false,
    },
    vanity: {
        type: String,
    },
});
exports.default = mongoose_1.model("Bots", botsSchema);
