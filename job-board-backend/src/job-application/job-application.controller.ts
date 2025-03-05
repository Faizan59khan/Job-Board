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
import { ApplyJobDto, UpdateStatusDto } from './dto/apply-job.dto';
import { JobApplication } from './job-application.entity';
import { JwtAuthGuard } from '../Guards/auth.guard';
import { EmployerGuard } from 'src/Guards/employer.guard';

@ApiTags('job-applications')
@ApiBearerAuth()
@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @ApiOperation({ summary: 'Apply for a job' })
  @ApiResponse({ status: 201, description: 'Job application submitted', type: JobApplication })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  applyForJob(@Body() applyJobDto: ApplyJobDto): Promise<JobApplication> {
    return this.jobApplicationService.apply(applyJobDto);
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
