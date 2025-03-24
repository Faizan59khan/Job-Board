import { JobService } from './job.service';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { User } from '../auth/user.entity';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    getAllJobs(): Promise<Job[]>;
    getEmployerJobs(user: User): Promise<Job[]>;
    createJob(jobData: CreateJobDto, user: User): Promise<Job>;
}
