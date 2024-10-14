import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PenguinModule } from './penguin/penguin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    StorageModule,
    PenguinModule,
  ],
})
export class AppModule {}
