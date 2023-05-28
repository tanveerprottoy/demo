import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbClientInstance } from "./libs/mongodb";
import { Constants } from "./utils/constants";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
    await DbClientInstance.init(
        "mongodb://localhost:27017", // "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
        "rbacDemo"
    );
    const app = await NestFactory.create(
        AppModule,
        {
            cors: true,
        }
    );
    app.setGlobalPrefix(Constants.API);
    app.enableVersioning({
        type: VersioningType.URI,
    });
    await app.listen(8080);
}

bootstrap();
