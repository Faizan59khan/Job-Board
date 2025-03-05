import { JobApplication } from 'src/job-application/job-application.entity';
export declare class Job {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    status: string;
    applications: JobApplication[];
    createdAt: Date;
}
