import { Repository, FindManyOptions, SaveOptions, FindOneOptions } from "typeorm";

export abstract class BaseService<T> {
    abstract repository: Repository<T>;

    async find(options?: FindManyOptions<T>) {
        return await this.repository.find(options);
    }

    async findOne(options?: FindOneOptions<T>) {
        return await this.repository.findOne(options);
    }

    async save(entity: any, options?: SaveOptions) {
        return await this.repository.save(entity, options);
    }

    async update(conditions: any, doc: any) {
        return await this.repository.update(conditions, doc);
    }
}
