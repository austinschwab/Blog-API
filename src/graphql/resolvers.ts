import { Resolvers } from '../generated/graphql';

export const resolvers: Resolvers = {
    Query: {
        allPosts: async (_, args, context) => {
            return await context.prisma.post.findMany();
        },
        getPostById: async (_, args, context) => {
            return await context.prisma.post.findUnique({
                where: {
                    id: args.id,
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
                    userId: 1,
                },
            });
        },
    },
};
