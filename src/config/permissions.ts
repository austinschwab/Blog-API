import { ApolloError, AuthenticationError } from 'apollo-server';
import { allow, and, rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'no_cache' })(
    (parent, args, ctx, info) => {
        if (ctx.userId === null) {
            throw new AuthenticationError('Not authorized !');
        }

        return true;
    }
);

export const permissions = shield(
    {
        Query: {
            '*': allow,
            // me: isAuthenticated,
        },
        Mutation: {
            '*': allow,
            // createPost: isAuthenticated,
            // updatePost: isAuthenticated,
            // createComment: isAuthenticated,
        },
    },
    {
        fallbackError: async (thrownThing, parent, args, context, info) => {
            if (thrownThing instanceof ApolloError) {
                return thrownThing;
            } else if (thrownThing instanceof Error) {
                return new ApolloError(
                    thrownThing.message ?? 'Internal server error',
                    'ERR_INTERNAL_SERVER'
                );
            } else {
                return new ApolloError(
                    'Internal server error',
                    'ERR_INTERNAL_SERVER'
                );
            }
        },
    }
);
