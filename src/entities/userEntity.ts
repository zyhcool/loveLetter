import { Entity, Column } from "typeorm";
import { GeneralEntity } from "./generalEntity";
import crypto from "crypto";

@Entity()
export class User extends GeneralEntity {
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

    // hashpassword = (p: string) => {
    //     return crypto.createHash("sha256").update(p).digest("hex");
    // };
    // comparePassword = (p: string) => {
    //     const hashedPwd = this.hashpassword(p);
    //     if (hashedPwd === this.password) {
    //         return true;
    //     }
    //     return false;
    // };
}

// export const userSchema = {
//     id: { type: "number", required: true, example: 1 },
//     name: { type: "string", required: true, example: "Javier" },
//     email: { type: "string", required: true, example: "avileslopez.javier@gmail.com" },
// };
