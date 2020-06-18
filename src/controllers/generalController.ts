import { BaseContext } from "koa";
import {
    Get,
    Controller,
    Authorized,
    CurrentUser,
    Put,
    QueryParams,
    Post,
    Body,
    UploadedFile,
} from "routing-controllers";
import { User } from "../entities/userEntity";
import { LoveLetterMode } from "../entities/loveLetterEntity";
import { Cache } from "../init/cache";
import { config } from "../config";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";

@Controller("/")
export default class GeneralController {
    @Authorized()
    @Get("/")
    public async helloWorld(@CurrentUser() user: User): Promise<any> {
        console.log(user);
        return "Hello World";
    }

    @Authorized()
    @Put("/changeMode")
    async changeLLMode(@QueryParams() query: { mode: LoveLetterMode }) {
        Cache.set(config.loveLetterModeKey, query.mode);
    }

    @Authorized()
    @Post("/upload")
    async upload(@UploadedFile("file") file: any) {
        const dir = config.uploadDir || "upload";
        const fileName = `${Math.random() * 1000}`.padStart(4, "0") + `${Date.now()}`;
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
        const filepath = dir + "/" + fileName;

        writeFileSync(resolve(process.cwd(), filepath), file.buffer);
        return filepath;
    }
}
