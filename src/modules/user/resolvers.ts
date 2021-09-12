// import { Resolvers, User } from '@generated/types';
import { User } from '@generated/types';
import { compare, hash } from 'bcryptjs';
import { AuthenticationError } from 'apollo-server';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@constants';
import { IResolvers } from 'graphql-middleware/dist/types';

export const resolvers: IResolvers = {
    Query: {
        me: async (_, args, context) => {
            return await context.prisma.user.findUnique({
                where: {
                    id: context.userId,
                },
                include: {
                    Post: true,
                    Comment: true,
                },
            });
        },
    },
    Mutation: {
        signUp: async (_, args, context) => {
            const hashedPassword = await hash(args.password, 10);

            const user: User = await context.prisma.user.create({
                data: {
                    email: args.email,
                    password: hashedPassword,
                    name: args.name,
                },
            });

            return {
                token: sign({ userId: user.id }, JWT_SECRET),
                user,
            };
        },
        signIn: async (_, args, context) => {
            const user = await context.prisma.user.findUnique({
                where: {
                    email: args.email,
                },
            });

            if (!user) {
                throw new Error(`No user found for email ${args.email}`);
            }

            const passwordIsValid = await compare(args.password, user.password);

            if (!passwordIsValid) {
                throw new AuthenticationError(`Invalid credentials`);
            }

            return {
                token: sign({ userId: user.id }, JWT_SECRET),
                user,
            };
        },
        updateUser: async (_, args, context) => {
            return await context.prisma.user.update({
                where: {
                    id: context.userId,
                },
                data: {
                    name: args.name,
                },
            });
        },
    },
};
