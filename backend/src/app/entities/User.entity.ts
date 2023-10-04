import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
@Unique(['email'])
export abstract class UserEntity {
  @ApiProperty({ description: 'ID del usuario' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: number;

  @ApiProperty({ description: 'Telefono de usuario' })
  @Column({ type: 'int' })
  phone: number;

  @ApiProperty({ description: 'Contraseña hasheada' })
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty({ description: 'Nombre' })
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @ApiProperty({ description: 'Correo electronico' })
  @Column({ type: 'varchar', length: 256 })
  email: string;

  @Column({ type: 'timestamp', name: 'deleted_date', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({
    name: 'created',
  })
  createdAt: Date; // Creation date

  @UpdateDateColumn({
    name: 'modified',
  })
  updatedAt: Date; // Last updated date
}
