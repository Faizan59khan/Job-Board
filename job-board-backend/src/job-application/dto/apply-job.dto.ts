import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { JobApplicationStatus } from 'src/utils/helper';

export class ApplyJobDto {
  @ApiProperty({ example: 1, description: 'ID of the job' })
  @IsNumber()
  jobId: number;

  @ApiProperty({ example: 2, description: 'ID of the applicant (user)' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'resume.pdf', description: 'Resume file path' })
  @IsString()
  resume: string;
}

export class UpdateStatusDto {
  @ApiProperty({ example: 'shortlisted', description: 'New status of the application' })
  @IsEnum(['applied', 'shortlisted', 'rejected', 'hired'])
  status: JobApplicationStatus;
}
