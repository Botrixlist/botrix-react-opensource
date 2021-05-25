import {NextFunction, Request, Response, Router} from 'express';

let route = Router();

route.get("/", (req : Request, res : Response, next : NextFunction) => {
    
});

export = route;