import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('api')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('users')
    async getData() {
        const data = await this.userService.loadData();
        return data;
    }

    @Get('users/:id')
    async getById(@Param('id') id: number) {
        const idNumber = parseInt(id.toString(), 10);
        const record = await this.userService.getById(idNumber)
        return record
    }

    @Post('users')
    async addUser(@Body() details: any) {
        await this.userService.addRecordToArray(details)
        return { message: 'Record added successfully' }
    }
}