"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Sanitize(user) {
    var cleanUser = {
        id: user.userid,
        flags: user.user_flags,
        bio: user.bio,
        username: user.username,
        bots: [user.bots],
        tag: user.discriminator,
        avatar: "https://cdn.discordapp.com/avatars/" + user.userid + "/" + user.avatar + ".png"
    };
    return cleanUser;
}
exports.default = Sanitize;
