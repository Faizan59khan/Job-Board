import { JobApplicationService } from './job-application.service';
import { ApplyJobDto, UpdateStatusDto, GetPresignedUrlDto } from './dto/apply-job.dto';
import { JobApplication } from './job-application.entity';
import { User } from '../auth/user.entity';
export declare class JobApplicationController {
    private readonly jobApplicationService;
    constructor(jobApplicationService: JobApplicationService);
    getPresignedUrl(dto: GetPresignedUrlDto): Promise<{
        presignedUrl: string;
        s3Key: string;
    }>;
    applyForJob(applyJobDto: ApplyJobDto, user: User): Promise<JobApplication>;
    getApplications(jobId: number): Promise<JobApplication[]>;
    updateStatus(applicationId: number, status: UpdateStatusDto): Promise<JobApplication>;
}
