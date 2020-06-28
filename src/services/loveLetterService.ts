import { BaseService } from "./baseService";
import { Repository, getManager } from "typeorm";
import { User } from "../entities/userEntity";
import { LoveLetter } from "../entities/loveLetterEntity";

export class LoveLetterService extends BaseService<LoveLetter> {
    repository: Repository<LoveLetter> = getManager().getRepository(LoveLetter);

    async createLoveLetter(loveLetter: Partial<LoveLetter>) {
        const res = await this.save(loveLetter);
        return res;
    }
}
