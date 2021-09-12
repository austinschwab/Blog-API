# Graphql API

A small API to learn Prisma and GraphQL.

## 📦 Packages used
- [Prisma](https://www.prisma.io/)
- [Apollo server](https://www.apollographql.com/docs/apollo-server/)
- [Prismix](https://www.npmjs.com/package/prismix)
- [GraphQL-codegen](https://www.graphql-code-generator.com/)

## 🎉 Get started

1. Install dependencies
```bash
npm install
```

1. Add your database url in `.env`
```env
DATABASE_URL="postgres://user:password@localhost:5432/db"
```

3. Run migrations
```bash
npm run prisma:migrate
```

4. Seed your database - **Optionnal** 
```bash
npm run prisma:seed
```

5. Start the app
```bash
npm run start
```