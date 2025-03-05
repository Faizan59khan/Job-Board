import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { JobApplication } from 'src/job-application/job-application.entity';

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

  // Relationship: One user can have multiple job applications
  @ApiProperty({ type: () => JobApplication })
  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.job)
  applications: JobApplication[];

  @CreateDateColumn()
  createdAt: Date;
}
