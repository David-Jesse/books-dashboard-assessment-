import { GraphQLClient } from 'graphql-request';

/**
 * Factory function for creating an authenticated GraphQL client.
 *
 * A new client is created per request to ensure the latest
 * Auth0 access token is always used. This avoids subtle bugs
 * caused by stale or undefined tokens when authentication
 * state changes (e.g. login/logout or token refresh).
 */
export function makeGqlClient(token: string) {
    /**
     * The Authorization header is injected dynamically so that
     * backend GraphQL resolvers protected by JWT guards can
     * validate each request independently.
     */
    return new GraphQLClient(import.meta.env.VITE_API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
