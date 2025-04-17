import { PrismaClient } from '@prisma/client';
import {
  generateRandomString,
  pickRandomDate,
  pickRandomNumber,
} from './util-seeder';

export async function bingoCardSeeder(prisma: PrismaClient) {
  const bingos = await prisma.bingos.findMany();
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2025-12-31');
  let i = 0;
  for (i = 0; i < 400; i++) {
    const bingoCard = await prisma.bingo_cards.create({
      data: {
        bingo_id: bingos[pickRandomNumber(0, bingos.length)].id,
        name: generateRandomString(100),
        is_active: true,
        start_date: pickRandomDate(startDate, endDate),
        end_date: pickRandomDate(startDate, endDate),
        background_color: generateRandomString(8),
        number_of_cards: pickRandomNumber(1, 5),
        card_range: generateRandomString(10),
        award_points: pickRandomNumber(0, 10000),
        status_points: pickRandomNumber(0, 10000),
        all_audiences: true,
        per_tile_counter: true,
        randomize_tile_placement: true,
      },
    });

    console.log({ bingoCard });
  }

  console.log(`Bingo Card Total Created ${i}`);
}
