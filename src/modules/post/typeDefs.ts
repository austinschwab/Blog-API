import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Post {
        id: String!
        title: String!
        content: String!
        isPublished: Boolean!
        timeStamp: String!
        user: User!
        userId: String!
    }

    type Query {
        getAllPosts: [Post!]
        getPostById(id: String!): Post!
    }

    type Mutation {
        createPost(
            title: String!
            content: String!
            isPublished: Boolean
        ): Post!
        updatePost(
            id: String!
            title: String
            content: String
            isPublished: Boolean
        ): Post!
    }
`;
