import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default prisma

async function main() {
    const newUser = await prisma.user.create({
      data: {
        name: "viktor",
        email: "viktor.skoeld@outlook.com"
      },
    });
    console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
  }
  
  main()
    .catch((e) => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });