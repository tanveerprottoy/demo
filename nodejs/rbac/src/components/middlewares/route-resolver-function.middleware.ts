import { Request, Response, NextFunction } from 'express';
import AppUtils from "../../utils/app.utils";

export function routeResolver(req: Request, res: Response, next: NextFunction) {
    /* console.log("req: ", req);
    console.log("req.path: ", req.path);
    console.log("req.path: ", req.params); */
    req["customRouteName"] = AppUtils.getRouteName(req.path, req.method);
    console.log("customRouteName: ", req["customRouteName"]);
    next();
};
