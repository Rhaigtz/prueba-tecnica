import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class SignInDto {
  @ApiProperty({ description: 'Correo electronico', required: true })
  @IsString()
  email: string;
  @ApiProperty({ description: 'Contraseña', required: true })
  @IsString()
  password: string;
}
