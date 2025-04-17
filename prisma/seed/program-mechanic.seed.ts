import { PrismaClient } from '@prisma/client';
import {
  generateRandomString,
  pickRandomDate,
  pickRandomNumber,
} from './util-seeder';

export async function programMechanicSeeder(prisma: PrismaClient) {
  const programs = await prisma.programs.findMany();
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2025-12-31');
  let i = 0;
  for (i = 0; i < 50; i++) {
    const programMechanic = await prisma.program_mechanics.create({
      data: {
        program_id: programs[pickRandomNumber(0, programs.length)].id,
        product_type: generateRandomString(50),
        product_id: pickRandomNumber(1, 1000),
        priority: pickRandomNumber(1, 10),
        name: generateRandomString(100),
        start_at: pickRandomDate(startDate, endDate),
        end_at: pickRandomDate(startDate, endDate),
        cap: pickRandomNumber(1, 16),
        cap_range: generateRandomString(40),
        award_points: pickRandomNumber(0, 50000),
        status_points: pickRandomNumber(0, 50000),
        upc_transactions_count: pickRandomNumber(0, 5000000),
        lucky_code_transactions_count: pickRandomNumber(0, 5000000),
        hurdle_transactions_count: pickRandomNumber(0, 5000000),
        raffle_entries: pickRandomNumber(0, 50000),
        is_active: true,
        all_audiences: true,
        is_custom_text_enabled: true,
        custom_text: generateRandomString(100),
      },
    });

    console.log({ programMechanic });
  }

  console.log(`Program Mechanic Total Created ${i}`);
}
