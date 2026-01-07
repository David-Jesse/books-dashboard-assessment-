import {GraphQLClient} from 'graphql-request';

export function makeGqlClient(token: string) {
    return new GraphQLClient(import.meta.env.VITE_API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}