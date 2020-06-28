import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";
import { getUUid } from "../utils/uuidGenerator";

@Entity()
export class LoveLetter {
    @ObjectIdColumn()
    id: string;

    @PrimaryColumn("uuid")
    loveLetterId: string;

    @Column()
    images: string[];

    @Column()
    sentence: string;

    @Column()
    mode: LoveLetterMode;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor() {
        this.loveLetterId = getUUid();
    }
}

export enum LoveLetterMode {
    me = 1, // 个人发挥
    internet = 2, // 网上爬取
}
