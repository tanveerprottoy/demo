import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RbacsService } from "../../modules/rbacs/rbacs.service";
import { UserRole } from "../enums/user.role";
import StringUtils from "../../utils/string.utils";

export interface AuthGuardConfig {
    disabled?: boolean;
}

export const AUTH_GUARD_CONFIG = Symbol("AUTH_GUARD_CONFIG");

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private readonly rbacsService: RbacsService
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        if(this.checkIfPublicRoute(context)) {
            return true;
        }
        return await this.validateRequest(req);
    }

    private checkIfPublicRoute(
        context: ExecutionContext
    ) {
        const handlerConfig = this.reflector.get<AuthGuardConfig>(
            AUTH_GUARD_CONFIG,
            context.getHandler(),
        );
        const controllerConfig = this.reflector.get<AuthGuardConfig>(
            AUTH_GUARD_CONFIG,
            context.getClass(),
        );
        if(controllerConfig?.disabled || handlerConfig?.disabled) {
            return true;
        }
        return false;
    }

    async validateRequest(req: any): Promise<boolean> {
        const data = await this.rbacsService.findAll(
            UserRole.User
        );
        console.log("req.url: ", req.url)
        console.log("req.urls: ", StringUtils.split(req.url, "/"))
        console.log("req.params: ", req.params)
        // check if role has access to the endpoint
        // const endpoint = data.endpoints.find(e => e == )
        return true;
    }
}