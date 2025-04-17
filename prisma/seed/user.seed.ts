import { PrismaClient } from '@prisma/client';
import { generateRandomString } from './util-seeder';

export async function userSeeder(prisma: PrismaClient) {
  let i = 0;
  for (i = 0; i < 50; i++) {
    const user = await prisma.users.create({
      data: {
        salesforce_user_id: generateRandomString(50),
        salesforce_contact_id: generateRandomString(25),
        account_number: generateRandomString(70),
        contact_flex: {},
        account_flex: {},
      },
    });
    console.log({ user });
  }
  console.log(`User Total Created ${i}`);
}
