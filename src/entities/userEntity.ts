import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";
import { getUUid } from "../utils/uuidGenerator";

@Entity()
export class User {
    @ObjectIdColumn()
    id: string;

    @PrimaryColumn("uuid")
    userId: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        length: 16,
    })
    password: string;

    @Column()
    isManager: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor() {
        this.userId = getUUid();
    }

}

