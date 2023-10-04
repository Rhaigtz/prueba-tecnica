/*
https://docs.nestjs.com/providers#services
*/

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserEntity } from '../entities/User.entity';
import { AuthService } from 'src/shared/utils/auth/auth.service';
import { UserRepository } from '../repository/user.repository';
import { SignInDto } from '../dto/sign-in.dto';
import searchBuilder, { ISearchQueryBuilder } from 'src/shared/search-builder';
import { ListEntities } from '../dto/ListInterface.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  public async findAll(
    queryFilters: ListEntities,
    extraColumns: ISearchQueryBuilder[],
  ): Promise<[UserEntity[], number]> {
    const query = this.userRepository.findAll();

    if (queryFilters.search) {
      searchBuilder(query, queryFilters.search, extraColumns);
    }

    if (queryFilters.sortField && queryFilters.sortOrder) {
      query.orderBy(`user.${queryFilters.sortField}`, queryFilters.sortOrder);
    }

    query.offset(queryFilters.skip || 0);
    query.limit(queryFilters.take || 10);

    return await query.getManyAndCount();
  }

  public async findOne(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne(id);
  }

  public async createNewUser(data: CreateUserDTO): Promise<UserEntity | null> {
    const newPassword = await this.authService.encryptPassword(data.password);
    return await this.userRepository.createUser({
      ...data,
      password: newPassword,
    });
  }

  public async signIn(data: SignInDto): Promise<string> {
    const user = await this.userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new NotFoundException('No existe informacion del usuario');
    }

    const isPasswordValid = await this.authService.comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('La contraseña es incorrecta');
    }

    return await this.authService.generateToken({ id: user.id as number });
  }
}
