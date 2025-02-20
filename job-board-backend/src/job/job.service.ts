// src/job/job.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async create(jobData: CreateJobDto): Promise<Job> {
    const newJob = this.jobRepository.create(jobData); // Uses TypeORM's create method
    return await this.jobRepository.save(newJob);
  }
}
