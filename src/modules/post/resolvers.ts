// import { Post, Resolvers } from '@generated/types';
import { Post } from '@generated/types';
import { IResolvers } from 'graphql-middleware/dist/types';

export const resolvers: IResolvers = {
    Query: {
        getAllPosts: async (_, args, context) => {
            return await context.prisma.post.findMany({
                include: {
                    user: true,
                    comment: true,
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
                    comment: {
                        include: {
                            user: true,
                        },
                    },
                },
            });
        },
    },
    Mutation: {
        createPost: async (_, args, context) => {
            const data: Partial<Post> = {
                ...args,
                userId: context.userId,
                published: args?.published ?? false,
            };

            if (args?.published) {
                data.publishedAt = data.published
                    ? new Date().toISOString()
                    : null;
            }

            return await context.prisma.post.create({
                data,
                include: {
                    user: true,
                    comment: true,
                },
            });
        },
        updatePost: async (_, args, context) => {
            const post: Post[] = await context.prisma.post.findMany({
                where: {
                    id: args.id,
                    user: {
                        id: context.userId,
                    },
                },
                include: {
                    user: true,
                },
            });

            if (post.length === 0) {
                throw new Error(
                    "You doesn't have permission to update this post"
                );
            }

            const data = args as Partial<Post>;

            if (args?.published) {
                data.published = args.published;
                data.publishedAt = args.published
                    ? new Date().toISOString()
                    : null;
            }

            return await context.prisma.post.update({
                where: {
                    id: args.id,
                },
                data,
                include: {
                    user: true,
                    comment: true,
                },
            });
        },
    },
};
