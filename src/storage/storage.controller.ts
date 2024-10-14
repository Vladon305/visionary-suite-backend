import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { StorageService } from './storage.service';
import { Prisma } from '@prisma/client';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('folder')
  createFolder(@Body() data: Prisma.FolderCreateInput) {
    return this.storageService.createFolder(data);
  }

  @Get('folders/:userId')
  getUserFolders(@Param('userId') userId: string) {
    return this.storageService.getUserFolders(userId);
  }

  @Post('file')
  createFile(@Body() data: Prisma.FileCreateInput) {
    return this.storageService.createFile(data);
  }

  @Get('files/:folderId')
  getFilesInFolder(@Param('folderId') folderId: string) {
    return this.storageService.getFilesInFolder(folderId);
  }

  @Post('permission')
  setPermission(@Body() data: Prisma.PermissionCreateInput) {
    return this.storageService.setPermission(data);
  }
}
