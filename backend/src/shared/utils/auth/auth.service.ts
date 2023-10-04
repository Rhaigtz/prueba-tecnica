/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from 'src/app/dto/jwt.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private salt: number;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.salt = Number(this.configService.get<number>('bcrypt.salt'));

    console.log(this.configService.get<string>('bcrypt'));
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.salt);
    return await bcrypt.hash(password, salt);
  }

  async generateToken(payload: JwtDto): Promise<string> {
    const token = await this.jwtService.signAsync({ payload });
    return token;
  }

  async comparePassword(password: string, encrypted: string) {
    return await bcrypt.compare(password, encrypted);
  }
}
