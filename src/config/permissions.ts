import { allow, rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'no_cache' })(
    (parent, args, ctx, info) => {
        console.log(`Token = ${ctx.userId}`);

        return ctx.userId !== null;
    }
);

export const permissions = shield({
    Query: {
        '*': allow,
        me: isAuthenticated,
    },
    Mutation: {
        '*': allow,
        createPost: isAuthenticated,
    },
});
