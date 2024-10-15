import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
