import { PrismaClient } from '@prisma/client';
import { pickRandomNumber } from './util-seeder';

export async function raffleEntriesSeeder(prisma: PrismaClient) {
  const programs = await prisma.programs.findMany();

  const upcTransactions = await prisma.upc_transactions.findMany({
    skip: 0,
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
    const raffleEntry = await prisma.raffle_entries.create({
      data: {
        user_id: upcTransaction.user_id,
        program_id:
          upcTransaction.program_mechanics?.program_id ??
          programs[pickRandomNumber(0, programs.length)].id,
        entries_count: pickRandomNumber(0, 100),
        transaction_type: 'App\\Models\\UpcTransaction',
        transaction_id: upcTransaction.id,
      },
    });
    console.log({ raffleEntry });
  }

  console.log(`Raffle Entries Total Created ${i}`);
}
