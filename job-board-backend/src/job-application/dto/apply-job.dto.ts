import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { JobApplicationStatus } from 'src/utils/helper';

export class GetPresignedUrlDto {
  @ApiProperty({ example: 'resume.pdf', description: 'Name of the file to upload' })
  @IsString()
  fileName: string;

  @ApiProperty({ example: 'application/pdf', description: 'MIME type of the file' })
  @IsString()
  fileType: string;
}

export class ApplyJobDto {
  @ApiProperty({ example: 1, description: 'ID of the job' })
  @IsNumber()
  jobId: number;

  @ApiProperty({ example: 'resumes/123-resume.pdf', description: 'S3 key of the uploaded resume' })
  @IsString()
  resume: string;
}

export class UpdateStatusDto {
  @ApiProperty({ example: 'accepted', description: 'New status for the application' })
  @IsEnum(['applied', 'shortlisted', 'rejected', 'hired'])
  status: JobApplicationStatus;
}
