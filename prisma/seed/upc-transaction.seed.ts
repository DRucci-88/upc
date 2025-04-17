import { PrismaClient } from '@prisma/client';
import { generateRandomString, pickRandomNumber } from './util-seeder';

const statusList = ['VALID', 'DOESNOTEXIST', 'EXPIRED'];

export async function upcTransactionSeeder(prisma: PrismaClient) {
  const users = await prisma.users.findMany();
  const programMechanics = await prisma.program_mechanics.findMany();
  const bingoCards = await prisma.bingo_cards.findMany();

  let i = 0;
  for (i = 0; i < 1000000; i++) {
    const upcTransaction = await prisma.upc_transactions.create({
      data: {
        user_id: users[pickRandomNumber(0, users.length)].id,
        program_mechanic_id:
          programMechanics[pickRandomNumber(0, programMechanics.length)].id,
        bingo_card_id: bingoCards[pickRandomNumber(0, bingoCards.length)].id,
        code: generateRandomString(255),
        pack_item: generateRandomString(255),
        brand_differentiator: generateRandomString(255),
        brand_family: generateRandomString(255),
        status: statusList[pickRandomNumber(0, statusList.length)],
      },
    });

    console.log({ upcTransaction });
  }

  console.log(`Upc Transaction Total Created ${i}`);
}
