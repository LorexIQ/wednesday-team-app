import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {User} from "../users.model";

export const UserData = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request: Express.Request = ctx.switchToHttp().getRequest();
        const user = request.user as User;
        return user ? data ? user[data] : user : null;
    }
);