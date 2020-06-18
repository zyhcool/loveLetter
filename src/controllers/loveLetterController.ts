import { BaseContext } from "koa";
import { getManager, Repository } from "typeorm";
import { User } from "../entities/userEntity";
import { Get, Controller, Authorized, CurrentUser, Post, Body } from "routing-controllers";
import { Inject } from "typedi";
import { LoveLetterService } from "../services/loveLetterService";
import { LoveLetter, LoveLetterMode } from "../entities/loveLetterEntity";
import { Cache } from "../init/cache";
import { config } from "../config";

@Controller("/loveLetter")
export default class LoveLetterController {
    @Inject((type) => LoveLetterService)
    loveLetterService: LoveLetterService;

    @Authorized()
    @Post("/")
    async createLoveLetter(@Body() body: { image: string; sentence: string }) {
        const data = Object.assign(new LoveLetter(), body);
        return await this.loveLetterService.createLoveLetter(data);
    }

    @Authorized()
    @Get("s/")
    async getLoveLetters() {
        return await this.loveLetterService.find({
            where: {},
            order: {
                createdAt: -1,
            },
        });
    }

    @Authorized()
    @Get("/last")
    async getLastLoveLetter() {
        const LOVELETTER_MODE: LoveLetterMode = Cache.get(config.loveLetterModeKey);
        return await this.loveLetterService.findOne({
            where: {
                mode: LOVELETTER_MODE,
            },
            order: {
                createdAt: -1,
            },
        });
    }
}
