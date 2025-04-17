import { PrismaClient } from '@prisma/client';
import { generateRandomString } from './util-seeder';

export async function programSeeder(prisma: PrismaClient) {
  let i = 0;
  for (i = 0; i < 50; i++) {
    const program = await prisma.programs.create({
      data: {
        name: generateRandomString(90),
        description: generateRandomString(200),
        is_active: true,
      },
    });
    console.log({ program });
  }

  console.log(`Program Total Created ${i}`);
}
