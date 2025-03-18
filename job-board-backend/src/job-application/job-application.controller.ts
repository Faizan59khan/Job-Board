import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JobApplicationService } from './job-application.service';
import { ApplyJobDto, UpdateStatusDto, GetPresignedUrlDto } from './dto/apply-job.dto';
import { JobApplication } from './job-application.entity';
import { JwtAuthGuard } from '../Guards/auth.guard';
import { EmployerGuard } from 'src/Guards/employer.guard';
import { Jobseeker } from 'src/Guards/jobseeker.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../auth/user.entity';

@ApiTags('job-applications')
@ApiBearerAuth()
@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @ApiOperation({ summary: 'Get presigned URL for resume upload' })
  @ApiResponse({ status: 200, description: 'Presigned URL generated successfully' })
  @Post('presigned-url')
  @UseGuards(JwtAuthGuard, Jobseeker)
  async getPresignedUrl(@Body() dto: GetPresignedUrlDto) {
    return this.jobApplicationService.generatePresignedUrl(dto);
  }

  @ApiOperation({ summary: 'Apply for a job' })
  @ApiResponse({ status: 201, description: 'Job application submitted', type: JobApplication })
  @Post()
  @UseGuards(JwtAuthGuard, Jobseeker)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  applyForJob(@Body() applyJobDto: ApplyJobDto, @GetUser() user: User): Promise<JobApplication> {
    return this.jobApplicationService.apply(applyJobDto, user.id);
  }

  @ApiOperation({ summary: 'Get applications for a job' })
  @ApiResponse({ status: 200, description: 'List of applications', type: [JobApplication] })
  @Get('job/:jobId')
  @UseGuards(JwtAuthGuard)
  getApplications(@Param('jobId') jobId: number): Promise<JobApplication[]> {
    return this.jobApplicationService.getApplicationsForJob(jobId);
  }

  @ApiOperation({ summary: 'Update application status' })
  @ApiResponse({ status: 200, description: 'Application status updated', type: JobApplication })
  @Patch(':applicationId')
  @UseGuards(JwtAuthGuard, EmployerGuard)
  updateStatus(
    @Param('applicationId') applicationId: number,
    @Body() status: UpdateStatusDto,
  ): Promise<JobApplication> {
    return this.jobApplicationService.updateStatus(applicationId, status);
  }
}
