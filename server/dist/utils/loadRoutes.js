"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var routesPath = path.join(__dirname, "../routes");
var files = [];
exports.default = (function (app) {
    ThroughDirectory(routesPath);
    files.forEach(function (name) {
        try {
            //check if its a pesky ts file hiding, we don't like those around here
            if (name.routePath.includes(".d.ts"))
                return;
            var route = require(name.dir);
            var routePath = name.routePath === "/index.js"
                ? "/"
                : "" + name.routePath
                    .slice(0, -3)
                    .replace(/\\/g, "/")
                    .replace("index", "");
            app.use(routePath, route);
            console.log("Loading " + routePath);
        }
        catch (error) {
            console.log("Error occured with the route \"" + name.routePath + "\":\n\n" + error + " Ignoreing continuing");
        }
    });
    return _this;
});
function ThroughDirectory(Directory) {
    fs.readdirSync(Directory).forEach(function (File) {
        var Absolute = path.join(Directory, File);
        if (fs.statSync(Absolute).isDirectory())
            return ThroughDirectory(Absolute);
        else
            return files.push({
                dir: Absolute,
                name: File,
                routePath: require("os").platform() === "win" + (32 || 64) ? Absolute.split("\\routes")[1] : Absolute.split("\/routes")[1],
            });
    });
}
