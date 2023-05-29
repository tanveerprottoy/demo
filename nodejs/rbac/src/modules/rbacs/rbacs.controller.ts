import { Controller, Get, Post, Body, Param, UseGuards, Delete } from '@nestjs/common';
import { RbacsService } from './rbacs.service';
import { CreateRbacDto } from './dto/create-rbac.dto';
import { Constants } from "../../utils/constants";
import { UserRole } from "../../components/enums/user.role";
import { AuthGuard } from "../../components/guards/auth.guard";

@Controller({
    path: "rbacs",
    version: Constants.API_VERSION_1
})
@UseGuards(AuthGuard)
export class RbacsController {

    constructor(private readonly rbacService: RbacsService) { }

    @Post()
    async create(@Body() dto: CreateRbacDto) {
        return await this.rbacService.create(dto);
    }

    @Get()
    async findAll() {
        return await this.rbacService.findAll(UserRole.User);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return await this.rbacService.findOne(id);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.rbacService.remove(id);
    }
}
