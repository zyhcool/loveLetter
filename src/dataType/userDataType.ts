import { IsEmail, Length, IsString } from "class-validator";

export class UserRegistryData {
    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 16)
    password: string;

    @IsString()
    @Length(6, 6)
    code: string;
}
