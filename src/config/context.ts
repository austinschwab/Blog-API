import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

export interface Context {
    userId: string | null;
    prisma: PrismaClient;
}

function getUserId(token: string): string | null {
    try {
        const decoded: any = verify(token, JWT_SECRET);

        return decoded.userId;
    } catch (err) {
        return null;
    }
}

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export function createContext({ req }: any): Context {
    const userId = getUserId(req.headers.authorization || '');

    return {
        userId,
        prisma,
    };
}
