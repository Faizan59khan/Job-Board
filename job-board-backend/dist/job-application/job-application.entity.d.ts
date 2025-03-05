import { Job } from '../job/job.entity';
import { User } from 'src/auth/user.entity';
import { JobApplicationStatus } from 'src/utils/helper';
export declare class JobApplication {
    id: number;
    job: Job;
    applicant: User;
    resume: string;
    status: JobApplicationStatus;
    appliedAt: Date;
}
