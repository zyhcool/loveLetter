import jwt from "jsonwebtoken";
import { config } from "../config";
import { Context, Request } from "koa";
import { IncomingMessage } from "http";

export async function initProtectedRouters(ctx: Context, next: () => any) {
    let token: string;
    const protectedRouters = [
        /^\/api\/general\/helloworld/,
        /^\/api\/loveLetter/,
        /^\/api\/loveLetters/,
        /^\/api\/loveLetter\/last/,
    ];

    const hasProtectedRouter = protectedRouters.some((regExp: RegExp) => {
        return regExp.test(ctx.url);
    });
    if (hasProtectedRouter) {
        token = getAuthorization(ctx.req);
        if (!token) {
            throw new Error('Authorization Error')
        }
        ctx.state.user = jwt.verify(token, config.jwtSecret);
    }
    await next();
}

function getAuthorization(req: IncomingMessage) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}
