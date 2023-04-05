import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '01658205896',
      database: 'test-project',
      entities: [User],
      synchronize: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
