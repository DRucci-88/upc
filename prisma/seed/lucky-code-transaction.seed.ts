import { PrismaClient } from '@prisma/client';
import { pickRandomNumber } from './util-seeder';

export async function luckyCodeTransaction(prisma: PrismaClient) {
  const luckyCodes = await prisma.lucky_codes.findMany();

  const programMechanics = await prisma.program_mechanics.findMany();

  const upcTransactions = await prisma.upc_transactions.findMany({
    skip: 1,
    take: 500000,
    orderBy: { id: 'asc' },
    select: {
      id: true,
      user_id: true,
      program_mechanics: true,
    },
    // include: { program_mechanics: true },
  });

  let i = 0;
  for (i = 0; i < upcTransactions.length; i++) {
    const upcTransaction = upcTransactions[i];
    const luckyCodeTransaction = await prisma.lucky_code_transactions.create({
      data: {
        user_id: upcTransaction.user_id,
        lucky_code_id: luckyCodes[pickRandomNumber(0, luckyCodes.length)].id,
        program_mechanic_id:
          upcTransaction.program_mechanics?.id ??
          programMechanics[pickRandomNumber(0, programMechanics.length)].id,
        upc_transaction_id: upcTransaction.id,
        sequence_level: pickRandomNumber(1, 10),
        nth_entry: pickRandomNumber(1, 10),
      },
    });

    console.log({ luckyCodeTransaction });
  }

  console.log(`Lucky Code Transaction Total Created ${i}`);
}
