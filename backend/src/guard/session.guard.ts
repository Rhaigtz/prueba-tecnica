import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
  Global,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UserEntity } from 'src/app/entities/User.entity';

@Global()
@Injectable()
export default class SessionGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  canActivate(
    context: ExecutionContext,
    silent?: boolean,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = (request.headers['authorization'] || '').split('Bearer ')[1];

    if (!token) {
      if (!silent) {
        Logger.error('Request without Token', null, 'SessionGuard');
      }
      throw new UnauthorizedException();
    }

    return this.jwtService
      .verifyAsync(token, {
        ignoreExpiration: false,
      })
      .then(async ({ payload: tokenUser }: { payload: any }) => {
        const { id } = tokenUser;

        if (!id) {
          if (!silent) {
            Logger.error('ID incorrect', null, 'SessionGuard');
          }
          throw new UnauthorizedException();
        }

        const user = await this.userRepository.findOne({
          where: { id, deletedAt: IsNull() },
          select: ['phone', 'id', 'name', 'email'],
        });

        if (!user) {
          if (!silent) {
            Logger.error(`User ID ${id} not found`, null, 'SessionGuard');
          }
          throw new UnauthorizedException();
        }

        request.user = user;
        return true;
      })
      .catch((error: any) => {
        if (!silent) {
          Logger.error(error, null, 'SessionGuard');
        }
        throw new UnauthorizedException();
      });
  }
}
