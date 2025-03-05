import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Job } from '../job/job.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { JobApplicationStatus } from 'src/utils/helper';

@Entity()
export class JobApplication {
  @ApiProperty({ example: 1, description: 'Unique ID of the application' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Job })
  @ManyToOne(() => Job, (job) => job.applications)
  job: Job;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.applications)
  applicant: User;

  @ApiProperty({ example: 'uploads/resume_123.pdf', description: 'Resume file path' })
  @Column()
  resume: string;

  @ApiProperty({ example: 'applied', description: 'Application status' })
  @Column({ default: 'applied' })
  status: JobApplicationStatus;

  @ApiProperty({ example: '2025-03-04T10:00:00.000Z', description: 'Date of application' })
  @CreateDateColumn()
  appliedAt: Date;
}
