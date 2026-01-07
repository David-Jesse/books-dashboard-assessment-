import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * GqlAuthGuard adapts Passport's JWT authentication mechanism
 * to work correctly within a GraphQL execution context.
 *
 * Unlike REST controllers, GraphQL resolvers do not expose the
 * HTTP request object directly, so we must extract it manually.
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

    /**
     * Override getRequest() so Passport can access the underlying
     * HTTP request and read the Authorization header.
     *
     * Without this override, JWT authentication would silently fail
     * because Passport would not be able to locate the token.
     */
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
