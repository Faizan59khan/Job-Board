import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
export declare class JobService {
    private jobRepository;
    constructor(jobRepository: Repository<Job>);
    findAll(): Promise<Job[]>;
    create(jobData: CreateJobDto): Promise<Job>;
}
