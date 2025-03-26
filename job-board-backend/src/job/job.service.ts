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

  async findByEmployer(employerId: number): Promise<Job[]> {
    return this.jobRepository.find({
      where: { postedBy: { id: employerId } },
      relations: ['postedBy'],
    });
  }

  async create(jobData: CreateJobDto, employerId: number): Promise<Job> {
    const newJob = this.jobRepository.create({
      ...jobData,
      postedBy: { id: employerId },
    });
    return await this.jobRepository.save(newJob);
  }
}
