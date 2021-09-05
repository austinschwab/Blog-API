import { Resolvers } from '../../generated/types';

export const resolvers: Resolvers = {
    Query: {
        getAllPosts: async (_, args, context) => {
            return await context.prisma.post.findMany({
                include: {
                    user: true,
                },
            });
        },
        getPostById: async (_, args, context) => {
            return await context.prisma.post.findUnique({
                where: {
                    id: args.id,
                },
                include: {
                    user: true,
                },
            });
        },
    },
    Mutation: {
        createPost: async (_, args, context) => {
            return await context.prisma.post.create({
                data: {
                    title: args.title,
                    content: args.content,
                    isPublished: args.isPublished ?? false,
                    userId: context.userId,
                },
                include: {
                    user: true,
                },
            });
        },
        updatePost: async (_, args, context) => {
            return await context.prisma.post.update({
                where: {
                    id: args.id,
                },
                data: {
                    title: args.title,
                    content: args.content,
                    isPublished: args.isPublished,
                    userId: context.userId,
                },
                include: {
                    user: true,
                },
            });
        },
    },
};
