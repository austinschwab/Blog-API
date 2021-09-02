import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./graphql/resolvers"
import { typeDefs } from "./graphql/typeDefs"

const prisma = new PrismaClient()

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => {
        return {
            prisma
        }
    }
})

const port = 4000
server.listen(port).then(({url}) => {
    console.log(`graphql server is running at ${url}graphql`);
})