import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './job-application.entity';
import { ApplyJobDto, UpdateStatusDto } from './dto/apply-job.dto';
import { Job } from '../job/job.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication) private jobAppRepo: Repository<JobApplication>,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async apply(applyJobDto: ApplyJobDto): Promise<JobApplication> {
    const { jobId, userId, resume } = applyJobDto;

    const job = await this.jobRepo.findOne({ where: { id: jobId } });
    if (!job) throw new NotFoundException(`Job with ID ${jobId} not found`);

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const application = this.jobAppRepo.create({ job, applicant: user, resume });
    return await this.jobAppRepo.save(application);
  }

  async getApplicationsForJob(jobId: number): Promise<JobApplication[]> {
    return await this.jobAppRepo.find({ where: { job: { id: jobId } }, relations: ['applicant'] });
  }

  async updateStatus(applicationId: number, status: UpdateStatusDto): Promise<JobApplication> {
    const application = await this.jobAppRepo.findOne({ where: { id: applicationId } });
    if (!application) throw new NotFoundException(`Application with ID ${applicationId} not found`);

    application.status = status.status;
    return await this.jobAppRepo.save(application);
  }
}
