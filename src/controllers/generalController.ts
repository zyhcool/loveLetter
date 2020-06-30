import { BaseContext, Context, Response } from "koa";
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
    ContentType,
    QueryParam,
    Ctx,
    Res,
    UseInterceptor,
} from "routing-controllers";
import { User } from "../entities/userEntity";
import { LoveLetterMode } from "../entities/loveLetterEntity";
import { Cache } from "../init/cache";
import { config } from "../config";
import { existsSync, mkdirSync, writeFileSync, createReadStream, readFileSync } from "fs";
import { resolve } from "path";
import send from "koa-send";
import { Worker } from "worker_threads";
import { WorkerThreadsManager } from "../utils/workerThreadsManager";

@Controller("/general")
export default class GeneralController {
    @Authorized()
    @Get("/helloworld")
    public async helloWorld(): Promise<any> {
        return "Hello World";
    }

    @Authorized()
    @Put("/changeMode")
    async changeLLMode(@QueryParams() query: { mode: LoveLetterMode }) {
        Cache.set(config.loveLetterModeKey, Number(query.mode));
        return { mode: Cache.get(config.loveLetterModeKey) };
    }

    @Authorized()
    @Post("/upload")
    async upload(@Ctx() ctx: Context, @UploadedFile("file") file: any) {
        console.log(file);
        const dir = config.uploadDir || "upload";
        const fileName =
            `${Math.random() * 1000}`.substring(0, 3).padStart(4, "0") + `${Date.now()}` + file.originalname;
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
        const filepath = dir + "/" + fileName;

        writeFileSync(resolve(process.cwd(), filepath), file.buffer);
        return filepath;
    }

    @Get("/image")
    @ContentType("image/*")
    async getImage(@QueryParam("url") url: string) {
        return createReadStream(url);
    }

    @Get("/test")
    async cputest() {
        console.log("----- begin!! ------")
        // let time = await WorkerThreadsManager.createWorker('./work.js')
        let time = cpuComsume();
        console.log(time);
        return time;
    }
}


export function cpuComsume() {
    const start = Date.now();
    for (let i = 0; i < 2 * 10 ** 9; i++) { };
    const end = Date.now();
    return (end - start) / 1000;
}