import * as dotenv from "dotenv"
import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from '@config/permissions';
import { createContext } from '@config/context';
import { merge } from 'lodash';

import * as Post from '@modules/post';
import * as User from '@modules/user';
import * as Comment from '@modules/comment';
import { makeExecutableSchema } from '@graphql-tools/schema';

dotenv.config()

const typeDefs = [Post.typeDefs, User.typeDefs, Comment.typeDefs];
const resolvers = merge(Post.resolvers, User.resolvers, Comment.resolvers);

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
        console.log(`🚀 GraphQL server is running at ${url}graphql`)
    )
    .catch((error) => console.log(error));
