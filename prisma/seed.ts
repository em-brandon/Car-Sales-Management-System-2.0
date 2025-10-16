import {PrismaClient} from '@prisma/client'
import { seedClassifieds } from './classifieds.seed';


const prisma = new PrismaClient()

async function main() {


await seedClassifieds(prisma);
console.log(`Database has been seeded. 🌱`);

}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });