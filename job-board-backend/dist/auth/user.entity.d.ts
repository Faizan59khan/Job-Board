import { Role } from 'src/utils/helper';
import { JobApplication } from 'src/job-application/job-application.entity';
import { Job } from 'src/job/job.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    applications: JobApplication[];
    jobs: Job[];
    createdAt: Date;
    fcmToken: string;
}
