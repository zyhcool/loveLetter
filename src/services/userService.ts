import { BaseService } from "./baseService";
import { Repository, getManager } from "typeorm";
import { User } from "../entities/userEntity";

export class UserService extends BaseService<User> {
    repository: Repository<User> = getManager().getRepository(User);

    async getUsers() {
        const users = await this.repository.find({
            where: {},
        });
        return users;
    }
}
