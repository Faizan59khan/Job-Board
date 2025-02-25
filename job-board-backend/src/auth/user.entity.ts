import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/utils/helper';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Unique ID of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'john_doe', description: 'Username' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashedpassword', description: 'Hashed password' })
  @Column()
  password: string;

  @ApiProperty({ example: 'JOBSEEKER', description: 'User role' })
  @Column({ default: '' })
  role: Role;

  @ApiProperty({
    example: '2025-02-20T15:28:20.000Z',
    description: 'User creation date',
  })
  @CreateDateColumn()
  createdAt: Date;
}
