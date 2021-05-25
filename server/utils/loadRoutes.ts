import * as path from 'path';
import * as fs from 'fs';
import { Router } from 'express';

let routesPath = path.join(__dirname, "../routes");
let files : Array<object> = [];

export default (app : any) => {
  ThroughDirectory(routesPath);

  files.forEach((name : any) => {
    try {
      //check if its a pesky ts file hiding, we don't like those around here
      if(name.routePath.includes(".d.ts")) return;

      let route : Router = require(name.dir);
      
      const routePath =
        name.routePath === "/index.js"
          ? "/"
          : `${name.routePath
              .slice(0, -3)
              .replace(/\\/g, "/")
              .replace("index", "")}`;
      app.use(routePath, route);
      console.log(`Loading ${routePath}`);
    } catch (error) {
      console.log(
        `Error occured with the route "${name.routePath}":\n\n${error} Ignoreing continuing`
      );
    }
  });
  return this;
}

function ThroughDirectory(Directory : string) {
  fs.readdirSync(Directory).forEach((File) => {
    const Absolute = path.join(Directory, File);
    if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
    else
      return files.push({
        dir: Absolute,
        name: File,
        routePath: require("os").platform() === `win${32 || 64}` ? Absolute.split("\\routes")[1] : Absolute.split("\/routes")[1],
      });
  });
} 

