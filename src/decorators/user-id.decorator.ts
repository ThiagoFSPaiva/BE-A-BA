import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { authorizationLoginPayload } from "src/utils/base-64-converter";

export const UserId = createParamDecorator((_,ctx: ExecutionContext) => {
    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const loginPayload = authorizationLoginPayload(authorization)

    return loginPayload?.id;
});