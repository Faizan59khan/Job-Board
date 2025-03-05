import { Repository } from 'typeorm';
import { JobApplication } from './job-application.entity';
import { ApplyJobDto, UpdateStatusDto } from './dto/apply-job.dto';
import { Job } from '../job/job.entity';
import { User } from 'src/auth/user.entity';
export declare class JobApplicationService {
    private jobAppRepo;
    private jobRepo;
    private userRepo;
    constructor(jobAppRepo: Repository<JobApplication>, jobRepo: Repository<Job>, userRepo: Repository<User>);
    apply(applyJobDto: ApplyJobDto): Promise<JobApplication>;
    getApplicationsForJob(jobId: number): Promise<JobApplication[]>;
    updateStatus(applicationId: number, status: UpdateStatusDto): Promise<JobApplication>;
}
