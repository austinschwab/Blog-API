import { gql } from "apollo-server";

export const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        post: [Post!]
    }

    type Post {
        id: Int!
        title: String!
        content: String!
        user: User
        userId: Int
    }

    type Query {
        allPosts: [Post!]
        getPostById(id: Int): Post!
    }

    type Mutation {
        createPost(title: String!, content: String!): Post!
    }
`