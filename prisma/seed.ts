import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const postContent =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

const posts = [
    {
        title: 'Article n°1',
        slug: 'article-1',
        content: postContent,
        published: false,
        publishedAt: null
    },
    {
        title: 'Article n°2',
        slug: 'article-2',
        content: postContent,
        published: false,
        publishedAt: null
    },
    {
        title: 'Article n°3',
        slug: 'article-3',
        content: postContent,
        published: true,
        publishedAt: new Date().toISOString(),
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

    posts.forEach(async (element) => {
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
