import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Software Engineer', description: 'Job title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Tech Corp', description: 'Company name' })
  @Column()
  company: string;

  @ApiProperty({ example: 'Remote', description: 'Job location' })
  @Column()
  location: string;

  @ApiProperty({ example: '5000', description: 'Salary amount' })
  @Column()
  salary: string;

  @ApiProperty({ example: 'open', description: 'Job status' })
  @Column({ default: 'open' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
