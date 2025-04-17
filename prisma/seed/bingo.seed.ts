import { PrismaClient } from '@prisma/client';
import { generateRandomString } from './util-seeder';

export async function bingoSeeder(prisma: PrismaClient) {
  let i = 0;
  for (i = 0; i < 50; i++) {
    const bingo = await prisma.bingos.create({
      data: {
        name: generateRandomString(20),
        description: generateRandomString(50),
        is_active: '1',
      },
    });
    // 0 non active
    // 1 active
    console.log({ bingo });
  }

  console.log(`Bingo Total Created ${i}`);
}
