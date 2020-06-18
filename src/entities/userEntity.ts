import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsEmail, IsBoolean } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({
        length: 80,
    })
    @Length(10, 80)
    name: string;

    @Column({
        length: 100,
    })
    @Length(10, 100)
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    @IsBoolean()
    isManager: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

// export const userSchema = {
//     id: { type: "number", required: true, example: 1 },
//     name: { type: "string", required: true, example: "Javier" },
//     email: { type: "string", required: true, example: "avileslopez.javier@gmail.com" },
// };
