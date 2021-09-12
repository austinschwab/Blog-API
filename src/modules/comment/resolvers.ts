// import { Resolvers } from '@generated/types';
import { IResolvers } from 'graphql-middleware/dist/types';

export const resolvers: IResolvers = {
    Query: {
        getCommentsByPost: async (_, args, context) => {
            return await context.prisma.comment.findMany({
                where: {
                    post: {
                        id: args.id,
                    },
                },
                include: {
                    user: true,
                    post: {
                        include: {
                            user: true,
                        },
                    },
                },
            });
        },
        getCommentsById: async (_, args, context) => {
            return await context.prisma.comment.findUnique({
                where: {
                    id: args.id,
                },
                include: {
                    user: true,
                    post: {
                        include: {
                            user: true,
                        },
                    },
                },
            });
        },
    },
    Mutation: {
        createComment: async (_, args, context) => {
            return await context.prisma.comment.create({
                data: {
                    ...args,
                    userId: context.userId,
                },
                include: {
                    user: true,
                    post: true,
                },
            });
        },
    },
};
