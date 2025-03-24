import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JobService } from './job.service';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from '../Guards/auth.guard';
import { User } from '../auth/user.entity';
import { GetUser } from '../decorators/get-user.decorator';

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

  @Get('employer')
  @UseGuards(JwtAuthGuard)
  getEmployerJobs(@GetUser() user: User): Promise<Job[]> {
    return this.jobService.findByEmployer(user.id);
  }

  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created', type: Job })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createJob(@Body() jobData: CreateJobDto, @GetUser() user: User): Promise<Job> {
    return this.jobService.create(jobData, user.id);
  }
}
