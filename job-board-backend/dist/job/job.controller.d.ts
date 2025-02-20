import { JobService } from './job.service';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    getAllJobs(): Promise<Job[]>;
    createJob(jobData: CreateJobDto): Promise<Job>;
}
