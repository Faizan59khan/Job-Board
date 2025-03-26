import { JobApplication } from 'src/job-application/job-application.entity';
import { User } from 'src/auth/user.entity';
export declare class Job {
    postedBy: User;
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    status: string;
    applications: JobApplication[];
    createdAt: Date;
}
