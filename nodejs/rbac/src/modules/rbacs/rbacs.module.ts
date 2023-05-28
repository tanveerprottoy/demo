import { Module } from '@nestjs/common';
import { RbacsService } from './rbacs.service';
import { RbacsController } from './rbacs.controller';
import { RbacsRepository } from "./rbacs.repository";

@Module({
    controllers: [RbacsController],
    providers: [
        RbacsService,
        RbacsRepository,
    ]
})
export class RbacsModule { }
