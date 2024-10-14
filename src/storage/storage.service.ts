import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Folder, File, Permission } from '@prisma/client';

@Injectable()
export class StorageService {
  constructor(private prisma: PrismaService) {}

  // Создание папки
  async createFolder(data: Prisma.FolderCreateInput): Promise<Folder> {
    return this.prisma.folder.create({ data });
  }

  // Получение всех папок пользователя
  async getUserFolders(userId: string): Promise<Folder[]> {
    return this.prisma.folder.findMany({ where: { ownerId: userId } });
  }

  // Создание файла
  async createFile(data: Prisma.FileCreateInput): Promise<File> {
    return this.prisma.file.create({ data });
  }

  // Получение файлов в папке
  async getFilesInFolder(folderId: string): Promise<File[]> {
    return this.prisma.file.findMany({ where: { folderId } });
  }

  // Управление доступом
  async setPermission(data: Prisma.PermissionCreateInput): Promise<Permission> {
    return this.prisma.permission.create({ data });
  }
}
