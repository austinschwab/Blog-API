import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Comment {
        id: String!
        content: String!
        post: Post!
        postId: String!
        user: User!
        userId: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getCommentsByPost(id: String!): [Comment]!
        getCommentsById(id: String!): Comment!
    }

    type Mutation {
        createComment(content: String!, postId: String!): Comment!
    }
`;
