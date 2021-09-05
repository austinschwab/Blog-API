import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const Posts = [
    {
        title: 'Article n°1',
        content: '',
        isPublished: false,
    },
    {
        title: 'Article n°2',
        content: '',
        isPublished: false,
    },
    {
        title: 'Article n°3',
        content: '',
        isPublished: false,
    },
];

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'bob@user.fr' },
        update: {},
        create: {
            email: 'bob@user.fr',
            name: 'Bob',
            password: await hash('securePassword', 10),
        },
    });

    Posts.forEach(async (element) => {
        await prisma.post.create({
            data: { ...element, userId: user.id },
        });
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
