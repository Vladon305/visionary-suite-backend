import { Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { PenguinService } from './penguin.service';

@Controller('penguin')
export class PenguinController {
  constructor(private readonly penguinService: PenguinService) {}

  @Post(':userId')
  createPenguin(@Param('userId') userId: string) {
    return this.penguinService.createPenguin(userId);
  }

  @Delete(':userId')
  deletePenguin(@Param('userId') userId: string) {
    return this.penguinService.deletePenguin(userId);
  }
  @Get(':userId')
  getPenguinState(@Param('userId') userId: string) {
    return this.penguinService.getPenguinState(userId);
  }

  @Patch(':userId/feed')
  feedPenguin(@Param('userId') userId: string) {
    return this.penguinService.feedPenguin(userId);
  }

  @Patch(':userId/complete-task')
  completeTask(@Param('userId') userId: string) {
    return this.penguinService.completeTask(userId);
  }

  @Patch(':userId/check')
  checkPenguinState(@Param('userId') userId: string) {
    return this.penguinService.checkPenguinState(userId);
  }
  // Получить мотивирующее сообщение с внешнего сервиса
  @Get(':userId/motivation')
  async getMotivationalQuote(@Param('userId') userId: number) {
    const quote = await this.penguinService.getMotivationalQuote();
    return {
      userId,
      quote,
    };
  }
}
