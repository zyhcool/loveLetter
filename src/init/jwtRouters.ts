import jwt from "koa-jwt";
import { config } from "../config";

export function initProtectedRouters() {
    const protectedRouters = [/^\/api\/general\/./, /^\/swagger-/, /^\/swagger-/];
    return jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] });
}
