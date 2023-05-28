import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../enums/user.role";

export interface AdminAuthGuardConfig {
    disabled?: boolean;
}

export const ADMIN_AUTH_GUARD_CONFIG = Symbol("ADMIN_AUTH_GUARD_CONFIG");

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector
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
        const handlerConfig = this.reflector.get<AdminAuthGuardConfig>(
            ADMIN_AUTH_GUARD_CONFIG,
            context.getHandler(),
        );
        const controllerConfig = this.reflector.get<AdminAuthGuardConfig>(
            ADMIN_AUTH_GUARD_CONFIG,
            context.getClass(),
        );
        if(controllerConfig?.disabled || handlerConfig?.disabled) {
            return true;
        }
        return false;
    }

    async validateRequest(req: any): Promise<boolean> {
        if(req.user.role === UserRole.Admin) {
            return true;
        }
        return false;
    }
}