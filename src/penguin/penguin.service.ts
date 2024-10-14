import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PenguinState } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface MotivationalQuote {
  q: string;
  a: string;
  h: string;
}

@Injectable()
export class PenguinService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async createPenguin(userId: string) {
    return this.prisma.penguin.create({
      data: {
        userId,
        state: PenguinState.HAPPY,
        hungerLevel: 0,
        lastTaskCompleted: new Date(),
        lastInteracted: new Date(),
      },
    });
  }

  async deletePenguin(userId: string) {
    return this.prisma.penguin.delete({
      where: { userId },
    });
  }

  async getPenguinState(userId: string) {
    return this.prisma.penguin.findUnique({
      where: { userId },
    });
  }

  async updatePenguinState(userId: string, state: PenguinState) {
    return this.prisma.penguin.update({
      where: { userId },
      data: { state, lastInteracted: new Date() },
    });
  }

  async feedPenguin(userId: string) {
    return this.updatePenguinState(userId, PenguinState.HAPPY);
  }

  async completeTask(userId: string) {
    return this.prisma.penguin.update({
      where: { userId },
      data: {
        state: 'HAPPY',
        lastTaskCompleted: new Date(),
      },
    });
  }

  async checkPenguinState(userId: string) {
    const penguin = await this.getPenguinState(userId);

    const currentTime = new Date();
    const timeSinceLastTask =
      (currentTime.getTime() - new Date(penguin.lastTaskCompleted).getTime()) /
      1000;
    const timeSinceLastInteraction =
      (currentTime.getTime() - new Date(penguin.lastInteracted).getTime()) /
      1000;

    let newState: PenguinState = penguin.state;

    if (timeSinceLastTask > 60 * 60) {
      // больше 1 часа
      newState = 'ANGRY';
    }
    if (timeSinceLastTask > 60 * 60 * 3) {
      // больше 3 часов
      newState = 'MONSTER';
    }

    return this.updatePenguinState(userId, newState);
  }

  async getMotivationalQuote(): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<MotivationalQuote>(
          'https://zenquotes.io/api/random',
        ),
      );
      const quoteData = response.data[0]; // Данные цитаты в массиве
      return `${quoteData.q} — ${quoteData.a}`; // Возвращаем цитату с автором
    } catch (error) {
      console.error('Error fetching quote:', error);
      return 'Keep pushing forward, you are doing great!'; // Фраза по умолчанию
    }
  }
}
