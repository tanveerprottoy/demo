import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import StringUtils from "../../utils/string.utils";

@Injectable()
export class RouteResolverMiddleware implements NestMiddleware {

    async use(req: Request, res: Response, next: NextFunction) {
        console.log("RouteResolverMiddleware.req.url: ", req.url);
        console.log("req.method: ", req.method);
        console.log("req.urls: ", StringUtils.split(req.url, "/"))
        console.log("req.params: ", req.params)
        console.log("req.query: ", req.query)
        next();
    }
}
