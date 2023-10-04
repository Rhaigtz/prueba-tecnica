/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserEntity } from '../entities/User.entity';
import { UserService } from '../services/user.service';
import { SignInDto } from '../dto/sign-in.dto';
import { HttpRequestService } from 'src/shared/utils/http-request.service';
import SessionGuard from 'src/guard/session.guard';
import { ListEntities } from '../dto/ListInterface.interface';
import { ISearchQueryBuilder } from 'src/shared/search-builder';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpRequestService,
  ) {}

  @UseGuards(SessionGuard)
  @Get()
  async findAll(
    @Query() query: ListEntities,
  ): Promise<{ users: UserEntity[]; total: number }> {
    const searchColumns: ISearchQueryBuilder[] = [
      {
        entityName: 'user',
        columnName: 'name',
        isStringColumn: true,
        executeSearch: true,
      },
      {
        entityName: 'user',
        columnName: 'email',
        isStringColumn: true,
        executeSearch: true,
      },
      {
        entityName: 'user',
        columnName: 'phone',
        isStringColumn: true,
        executeSearch: true,
      },
      {
        entityName: 'user',
        columnName: 'id',
        isStringColumn: true,
        executeSearch: true,
      },
    ];
    try {
      const [users, total] = await this.userService.findAll(
        query,
        searchColumns,
      );
      return { users, total };
    } catch (e) {
      console.log(e);
      throw new NotFoundException('No se encontraron usuarios');
    }
  }

  @UseGuards(SessionGuard)
  @Get('me')
  async findMe(): Promise<UserEntity> {
    const { user } = this.httpService.getRequest();
    return user;
  }

  @Post()
  async create(@Body() body: CreateUserDTO): Promise<UserEntity | null> {
    try {
      const newUser = await this.userService.createNewUser(body);
      return newUser;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'Correo electronico se encuentra actualmente registrado.',
      );
    }
  }

  @Post('signIn')
  async signIn(@Body() signInBody: SignInDto): Promise<string> {
    console.log(signInBody);
    try {
      const token = await this.userService.signIn(signInBody);
      return token;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(
        'Correo electronico o contraseña incorrecta.',
      );
    }
  }
}
