const { PrismaClient } = require('@prisma/client');
const { hash } = require('argon2');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@mail.ru',
        password: await hash('admin1'),
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Mock data inserted');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
