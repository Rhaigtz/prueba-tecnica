import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Direction } from '../enum/direction';

export class ListEntities {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  skip?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  take?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sortField?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sortOrder?: Direction;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;
}
