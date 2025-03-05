import { JobApplicationService } from './job-application.service';
import { ApplyJobDto, UpdateStatusDto } from './dto/apply-job.dto';
import { JobApplication } from './job-application.entity';
export declare class JobApplicationController {
    private readonly jobApplicationService;
    constructor(jobApplicationService: JobApplicationService);
    applyForJob(applyJobDto: ApplyJobDto): Promise<JobApplication>;
    getApplications(jobId: number): Promise<JobApplication[]>;
    updateStatus(applicationId: number, status: UpdateStatusDto): Promise<JobApplication>;
}
