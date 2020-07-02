import dotenv from "dotenv";
import { LoveLetterMode } from "./entities/loveLetterEntity";

dotenv.config({ path: ".env" });

export interface Config {
    port: number;
    debugLogging: boolean;
    dbsslconn: boolean;
    jwtSecret: string;
    databaseUrl: string;
    entities: string[];
    cronJobExpression: string;
    loveLetterModeKey: string;
    loveLetterModeDefault: LoveLetterMode;
    uploadDir: string;
}

const isDevMode = process.env.NODE_ENV == "development";

const config: Config = {
    port: +(process.env.PORT || 3001),
    debugLogging: isDevMode,
    dbsslconn: !isDevMode,
    jwtSecret: process.env.JWT_SECRET || "your-secret-whatever",
    databaseUrl: isDevMode ? "mongodb://47.93.236.248:27017/loveLetter" : "mongodb://localhost:27017/loveLetter",
    entities: isDevMode ? ["src/entities/*.ts"] : ["src/entities/*.js"],
    cronJobExpression: "0 * * * *",
    loveLetterModeKey: "lltKey",
    loveLetterModeDefault: LoveLetterMode.me,
    uploadDir: "upload",
};

export { config };
