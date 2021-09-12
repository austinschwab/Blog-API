import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Post {
        id: String!
        title: String!
        slug: String!
        content: String!
        published: Boolean!
        createdAt: String!
        updatedAt: String!
        publishedAt: String
        user: User
        userId: String!
        Comment: [Comment!]
    }

    type Query {
        getAllPosts: [Post!]
        getPostById(id: String!): Post!
    }

    type Mutation {
        createPost(
            title: String!
            slug: String!
            content: String!
            published: Boolean
        ): Post!
        updatePost(
            id: String!
            title: String
            slug: String
            content: String
            published: Boolean
        ): Post!
    }
`;
