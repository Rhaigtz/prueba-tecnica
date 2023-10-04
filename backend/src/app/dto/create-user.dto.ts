import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'Nombre', required: true })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Correo electronico', required: true })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Numero telefonico', required: true })
  @IsNumber()
  phone: number;

  @ApiProperty({ description: 'Nombre', required: true })
  @IsString()
  password: string;
}
