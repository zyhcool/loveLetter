import { BaseContext } from "koa";
import { getManager, Repository } from "typeorm";
import { User } from "../entities/userEntity";
import { Get, Controller, Authorized, CurrentUser, Post, Body, Put } from "routing-controllers";
import { Inject } from "typedi";
import { LoveLetterService } from "../services/loveLetterService";
import { LoveLetter, LoveLetterMode } from "../entities/loveLetterEntity";
import { Cache } from "../init/cache";
import { config } from "../config";
import { LLCreateData } from "../dataType/loveLetterDataType";
import { validate } from "class-validator";

@Controller("/loveLetter")
export default class LoveLetterController {
    @Inject((type) => LoveLetterService)
    loveLetterService: LoveLetterService;

    @Authorized()
    @Post("/")
    async createLoveLetter(@Body() body: LLCreateData) {
        const data = Object.assign({}, new LLCreateData(), body)
        const errors = await validate(data);
        if (errors && errors.length > 0) {
            throw errors;
        }
        const loveLetter = Object.assign({}, new LoveLetter(), body);
        return await this.loveLetterService.createLoveLetter(loveLetter);
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
        console.log(LOVELETTER_MODE)
        return await this.loveLetterService.findOne({
            where: {
                mode: LOVELETTER_MODE,
            },
            order: {
                createdAt: -1,
            },
        });
    }

    @Authorized()
    @Put("/")
    async updateLoveLetter(@Body() update: any) {
        return this.loveLetterService.update({ loveLetterId: update.loveLetterId }, update);
    }
}
