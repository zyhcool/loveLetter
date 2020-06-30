import { Middleware, KoaMiddlewareInterface, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { Context } from "koa";


@Middleware({ type: "before" })
export class ErrorHandler implements KoaMiddlewareInterface {
    async use(ctx: Context, next: (err?: any) => Promise<any>) {
        try {
            await next();
        }
        catch (e) {
            console.log(e)
            ctx.body = {
                success: false,
                data: e.message
            }
        }
    }
}