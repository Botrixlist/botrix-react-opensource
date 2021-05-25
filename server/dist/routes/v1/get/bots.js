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
var bot_1 = __importDefault(require("../../../models/bot"));
var softcheck_1 = __importDefault(require("../../../middleware/softcheck"));
var sanitizebots_1 = __importDefault(require("../../../utils/sanitizebots"));
var route = express_1.Router();
route.get("/featured", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var featured, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, bot_1.default
                    .find({ state: "verified" })
                    .sort({ votes: "descending" })
                    .limit(12)
                    .cache(10000)];
            case 1:
                featured = _d.sent();
                _b = (_a = res).json;
                _c = {};
                return [4 /*yield*/, sanitizebots_1.default(featured)];
            case 2:
                _b.apply(_a, [(_c.bots = _d.sent(), _c)]);
                return [2 /*return*/];
        }
    });
}); });
route.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var page_bots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.query.page) return [3 /*break*/, 2];
                return [4 /*yield*/, bot_1.default
                        .find({ state: "verified" })
                        .limit(req.query.page === 1 ? 10 : req.query.page * 10 * 2)
                        .skip(req.query.page === 1 ? 0 : req.query.page * 10)
                        .cache(10000)];
            case 1:
                page_bots = _a.sent();
                res.json({ bots: page_bots });
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
route.get("/:id", softcheck_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bot;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, bot_1.default.findOne({ botid: req.params.id })];
            case 1:
                bot = _c.sent();
                if (!bot)
                    return [2 /*return*/, res.json({ error: "Bot not found!" }).status(404)];
                if (!(!req.user && !((_a = bot === null || bot === void 0 ? void 0 : bot.owners) === null || _a === void 0 ? void 0 : _a.includes((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)))) return [3 /*break*/, 3];
                return [4 /*yield*/, sanitizebots_1.default(bot)];
            case 2:
                bot = _c.sent();
                _c.label = 3;
            case 3:
                res.json({ bot: bot });
                return [2 /*return*/];
        }
    });
}); });
module.exports = route;
