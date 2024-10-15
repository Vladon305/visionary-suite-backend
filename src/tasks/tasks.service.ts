import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Создать задачу
  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  // Получить все задачи
  findAll() {
    return this.prisma.task.findMany();
  }

  // Найти задачу по ID
  findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  // Обновить задачу
  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  // Удалить задачу
  remove(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
