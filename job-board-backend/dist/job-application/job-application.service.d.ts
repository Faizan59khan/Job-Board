import { Repository } from 'typeorm';
import { JobApplication } from './job-application.entity';
import { ApplyJobDto, UpdateStatusDto, GetPresignedUrlDto } from './dto/apply-job.dto';
import { Job } from '../job/job.entity';
import { User } from 'src/auth/user.entity';
export declare class JobApplicationService {
    private jobAppRepo;
    private jobRepo;
    private userRepo;
    private s3Client;
    private readonly bucketName;
    constructor(jobAppRepo: Repository<JobApplication>, jobRepo: Repository<Job>, userRepo: Repository<User>);
    generatePresignedUrl(dto: GetPresignedUrlDto): Promise<{
        presignedUrl: string;
        s3Key: string;
    }>;
    apply(applyJobDto: ApplyJobDto, userId: number): Promise<JobApplication>;
    getApplicationsForJob(jobId: number): Promise<JobApplication[]>;
    updateStatus(applicationId: number, status: UpdateStatusDto): Promise<JobApplication>;
}
