import { Module } from '@nestjs/common';
import { PenguinService } from './penguin.service';
import { PenguinController } from './penguin.controller';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [PenguinService, PrismaService],
  controllers: [PenguinController],
  imports: [HttpModule],
})
export class PenguinModule {}
