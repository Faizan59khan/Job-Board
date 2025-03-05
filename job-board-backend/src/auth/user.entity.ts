import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/utils/helper';
import { JobApplication } from 'src/job-application/job-application.entity';

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
  // Relationship: One user can have multiple job applications
  @ApiProperty({ type: () => JobApplication })
  @OneToMany(() => JobApplication, (application) => application.applicant)
  applications: JobApplication[];

  @CreateDateColumn()
  createdAt: Date;
}
