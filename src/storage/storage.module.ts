import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [StorageService, PrismaService],
  controllers: [StorageController],
})
export class StorageModule {}
