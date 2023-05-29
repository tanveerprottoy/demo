import { Injectable } from '@nestjs/common';
import { CreateRbacDto } from './dto/create-rbac.dto';
import { RbacsRepository } from "./rbacs.repository";

@Injectable()
export class RbacsService {

    constructor(
        private readonly rbacsRepository: RbacsRepository
    ) { }

    async create(dto: CreateRbacDto) {
        return await this.rbacsRepository.create(dto);
    }

    async findAll(role: string) {
        return await this.rbacsRepository.readManyStream(
            {
                role: role
            },
            100,
            1
        );
    }

    async findOne(id: string) {
        return await this.rbacsRepository.readOne(id);
    }

    async remove(id: string) {
        return await this.rbacsRepository.delete(id);
    };
}
