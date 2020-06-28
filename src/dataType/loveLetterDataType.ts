import { Length, IsString, IsArray, IsNumber } from "class-validator";
import { LoveLetterMode } from "../entities/loveLetterEntity";

export class LLCreateData {
    @IsArray()
    images: Array<string>;

    @IsString()
    @Length(0, 200)
    sentence: string;

    @IsNumber()
    mode: LoveLetterMode;
}
