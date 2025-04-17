import { PrismaClient } from '@prisma/client';
import { generateRandomString, pickRandomNumber } from './util-seeder';

export async function pointTransactionSeeder(prisma: PrismaClient) {
  const upcTransactions = await prisma.upc_transactions.findMany({
    skip: 0,
    take: 500000,
    orderBy: { id: 'asc' },
    select: {
      id: true,
      user_id: true,
    },
  });

  console.log(upcTransactions);

  let i = 0;
  for (i = 0; i < upcTransactions.length; i++) {
    const upcTransaction = upcTransactions[i];
    const pointTransaction = await prisma.point_transactions.create({
      data: {
        user_id: upcTransaction.user_id,
        salesforce_response_id: generateRandomString(70),
        award_points: pickRandomNumber(0, 100),
        status_points: pickRandomNumber(0, 100),
        description: generateRandomString(100),
        model_type: 'App\\Models\\UpcTransaction',
        model_id: upcTransaction.id,
      },
    });

    console.log({ pointTransaction });
  }
  console.log(`Point Transaction Total Created ${i}`);
}
