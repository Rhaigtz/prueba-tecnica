/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/User.entity';
import { AuthModule } from 'src/shared/utils/auth/auth.module';
import { HttpRequestService } from 'src/shared/utils/http-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, HttpRequestService],
})
export class UserModule {}
