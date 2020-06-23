import Koa from "koa";
import jwt from "koa-jwt";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import winston from "winston";
import "reflect-metadata";
import path from "path";

import { logger } from "./logger";
import { config } from "./config";
import { cron } from "./cron";
import { useKoaServer, Action, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { dbConnect } from "./init/dbConnection";
import { Cache } from "./init/cache";
const setupServer = async () => {
    // Mysql connection
    // await dbConnect();

    const app = new Koa();

    app.use(helmet());
    app.use(cors());
    app.use(logger(winston));
    app.use(bodyParser());

    // app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }));

    // init routing-controllers
    useContainer(Container);
    useKoaServer(app, {
        routePrefix: "/api",
        controllers: [path.resolve(__dirname, "controllers/*")],
        interceptors: [path.resolve(__dirname, "interceptors/*")],
        middlewares: [path.resolve(__dirname, "middlewares/*")],
        validation: false,
        defaultErrorHandler: false,

        currentUserChecker: async (action: Action) => {
            // TODO
            const user = "this.is.user";
            return user;
        },

        authorizationChecker: async (action: Action, permissions: string[]) => {
            // TODO
            return true;
        },
    });

    app.listen(config.port);
    console.log(`Server running on port ${config.port}`);

    // 初始化前端展示模式
    Cache.set(config.loveLetterModeKey, config.loveLetterModeDefault);

    cron.start();
};

setupServer();
