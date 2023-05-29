import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import StringUtils from "../../utils/string.utils";

@Injectable()
export class RequestInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        /* console.log("req.url: ", req.url)
        console.log("req.params: ", req.params)
        console.log("req.query: ", req.query)
        console.log("req.urls: ", StringUtils.split(req.url, "/")) */
        return next.handle();
    };
};