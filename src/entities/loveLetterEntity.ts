import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsEmail } from "class-validator";

@Entity()
export class LoveLetter {
    @PrimaryGeneratedColumn("uuid")
    id: string;

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
}

// export const loveLetterSchema = {
//     id: { type: "string", required: true },
//     images: { type: "Array", required: true },
//     sentence: { type: "string", required: true },
// };

export enum LoveLetterMode {
    me, // 个人发挥
    internet, // 网上爬取
}
