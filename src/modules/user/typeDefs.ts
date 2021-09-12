import { gql } from 'apollo-server';

export const typeDefs = gql`
    type User {
        id: String!
        name: String!
        email: String!
        Post: [Post!]
        Comment: [Comment!]
        createdAt: String!
        updatedAt: String!
    }

    type AuthenticatedUser {
        token: String!
        user: User!
    }

    type Query {
        me: User!
    }

    type Mutation {
        signUp(
            name: String!
            email: String!
            password: String!
        ): AuthenticatedUser!
        signIn(email: String!, password: String!): AuthenticatedUser!
        updateUser(name: String!): User!
    }
`;
