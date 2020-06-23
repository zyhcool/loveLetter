import { User } from "../entities/userEntity";
import { Get, Controller, Authorized, CurrentUser, Post, Body, Req } from "routing-controllers";
import { Inject } from "typedi";
import { UserService } from "../services/userService";
import { UserRegistryData } from "../dataType/userDataType";
import { validate } from "class-validator";
import jwt from "jsonwebtoken";
import { config } from "../config";

@Controller("/user")
export default class UserController {
    // @Inject((type) => UserService)
    userService: UserService;

    @Authorized()
    @Get("s/")
    public async getUsers(@CurrentUser() user: User): Promise<User[]> {
        const users = await this.userService.getUsers();
        return users;
    }

    @Authorized()
    @Post("/")
    async register(@Body() body: { email: string; password: string }) {
        const data = new UserRegistryData();
        const errors = await validate(data);
        if (errors) {
            throw errors;
        }
        const user = Object.assign(new User(), data);
        return await this.userService.repository.save(user);
    }

    @Authorized()
    @Post("/login")
    async login(@Body() body: { email: string; password: string }) {
        const { email, password } = body;
        // const user = await this.userService.findOne({
        //     where: {
        //         email: { $eq: email },
        //     },
        // });
        const user = new User();
        user.password = "haha";
        console.log(user.comparePassword(password));
        return;
        const token = jwt.sign(body, config.jwtSecret);
        return token;
    }
}
