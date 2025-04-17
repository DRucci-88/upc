import { PrismaClient } from '@prisma/client';
import { generateRandomString, pickRandomNumber } from './util-seeder';

export async function luckyCodeSeeder(prisma: PrismaClient) {
  let i = 0;
  for (i = 0; i < 50; i++) {
    const luckyCode = await prisma.lucky_codes.create({
      data: {
        name: generateRandomString(50),
        win_limit: pickRandomNumber(1, 30),
        win_limit_range: generateRandomString(10),
        is_active: true,
      },
    });
    console.log({ luckyCode });
  }

  console.log(`Lucky Code Total Created ${i}`);
}
