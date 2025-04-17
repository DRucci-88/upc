import { PrismaClient } from '@prisma/client';
import { upcTransactionSeeder } from './upc-transaction.seed';
import { userSeeder } from './user.seed';
import { programSeeder } from './program.seed';
import { programMechanicSeeder } from './program-mechanic.seed';
import { bingoSeeder } from './bingo.seed';
import { bingoCardSeeder } from './bingo-card.seed';
import { pointTransactionSeeder } from './point-transaction.seed';
import { raffleEntriesSeeder } from './raffle-entries.seed';
import { luckyCodeSeeder } from './lucky-code.seed';
import { luckyCodeTransaction } from './lucky-code-transaction.seed';

const prisma = new PrismaClient();

async function main() {
  // Promise.all([commonSeeder(prisma), userSeeder(prisma)]);
  // return Promise.all([upcTransactionSeeder(prisma)]);
  // await userSeeder(prisma);
  // await programSeeder(prisma);
  // await programMechanicSeeder(prisma);
  // await bingoSeeder(prisma);
  // await bingoCardSeeder(prisma);
  // await upcTransactionSeeder(prisma);

  // await Promise.all([
  //   pointTransactionSeeder(prisma),
  //   raffleEntriesSeeder(prisma),
  // ]);

  await luckyCodeSeeder(prisma);
  await luckyCodeTransaction(prisma);
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    // Close Prisma Client at the end
    void prisma.$disconnect();
  });
