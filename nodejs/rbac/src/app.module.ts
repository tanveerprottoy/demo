import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RbacsModule } from './modules/rbacs/rbacs.module';
import { RouteResolverMiddleware } from "./components/middlewares/route-resolver.middleware";

@Module({
    imports: [
        RbacsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

    /* configure(consumer: MiddlewareConsumer): void {
        consumer.apply(RouteResolverMiddleware)
            .exclude({ path: 'api/v1/auth', method: RequestMethod.ALL })
            .forRoutes("/");
    } */
}
