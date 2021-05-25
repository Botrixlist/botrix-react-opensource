"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BotrixEmbed = /** @class */ (function () {
    function BotrixEmbed() {
        this.embed = {
            title: null,
            description: null,
            fields: [],
            author: null,
            footer: null,
            color: null,
            url: null,
        };
    }
    BotrixEmbed.prototype.setTitle = function (title) {
        this.embed.title = title;
        return this;
    };
    BotrixEmbed.prototype.setDescription = function (description) {
        this.embed.description = description;
        return this;
    };
    BotrixEmbed.prototype.setAuthor = function (_a) {
        var name = _a.name, url = _a.url, icon_url = _a.icon_url;
        this.embed.author = {
            name: name ? name : null,
            url: url ? url : null,
            icon_url: icon_url ? icon_url : null
        };
    };
    BotrixEmbed.prototype.addField = function (title, value, inline) {
        if (inline === void 0) { inline = false; }
        var field = {
            name: title,
            value: value,
            inline: inline
        };
        this.embed.fields.push(field);
        return this;
    };
    BotrixEmbed.prototype.setColor = function (color) {
        this.embed.color = color;
        return this;
    };
    return BotrixEmbed;
}());
exports.default = BotrixEmbed;
