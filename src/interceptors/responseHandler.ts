import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

@Interceptor()
export class ResponseHandler implements InterceptorInterface {
    intercept(action: Action, content: any) {
        return action.response.send({
            success: true,
            data: content || null,
        });
    }
}
