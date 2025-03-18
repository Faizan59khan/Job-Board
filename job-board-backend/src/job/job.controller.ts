import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JobService } from './job.service';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from '../Guards/auth.guard';

@ApiTags('job')
@ApiBearerAuth()
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'List of jobs', type: [Job] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllJobs(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created', type: Job })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true })) // Enables validation
  createJob(@Body() jobData: CreateJobDto): Promise<Job> {
    return this.jobService.create(jobData);
  }
}
