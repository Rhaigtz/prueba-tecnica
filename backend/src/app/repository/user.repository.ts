/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll() {
    const query = this.userRepository.createQueryBuilder('user');

    return query;
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(user: CreateUserDTO): Promise<UserEntity | null> {
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
