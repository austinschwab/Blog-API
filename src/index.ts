import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { permissions } from './config/permissions';
import { createContext } from './config/context';
import { merge } from 'lodash';

import * as Post from './modules/post';
import * as User from './modules/user';

const typeDefs = [Post.typeDefs, User.typeDefs];
const resolvers = merge(Post.resolvers, User.resolvers);

console.log(resolvers);

const server = new ApolloServer({
    schema: applyMiddleware(
        makeExecutableSchema({ typeDefs, resolvers }),
        permissions
    ),
    context: createContext,
});

const port = 4000;
server
    .listen(port)
    .then(({ url }) =>
        console.log(`graphql server is running at ${url}graphql`)
    )
    .catch((error) => console.log(error));
