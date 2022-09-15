import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { ConvertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query', 'error']
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });
  res.status(200).json(games);
})

app.post('/games/:id/ads', (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
      createdAt: body.createdAt,

    }
  })
  res.status(201).json(ad);
})

app.get('/games/:id/ads', async(req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
  res.status(200).json(ads.map((ad) => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: ConvertMinutesToHourString(ad.hourStart),
    hourEnd: ConvertMinutesToHourString(ad.hourEnd),
  })));
})

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;
  const discord = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })
  res.status(200).json(discord);
})

app.listen(PORT, () => console.log(`Running at ${PORT}...`))