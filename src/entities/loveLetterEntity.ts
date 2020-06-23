import { Entity, Column } from "typeorm";
import { GeneralEntity } from "./generalEntity";

@Entity()
export class LoveLetter extends GeneralEntity {
    @Column()
    images: string[];

    @Column()
    sentence: string;

    @Column()
    mode: LoveLetterMode;
}

export enum LoveLetterMode {
    me, // 个人发挥
    internet, // 网上爬取
}
