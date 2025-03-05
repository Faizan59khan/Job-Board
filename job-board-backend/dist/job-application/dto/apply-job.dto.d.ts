import { JobApplicationStatus } from 'src/utils/helper';
export declare class ApplyJobDto {
    jobId: number;
    userId: number;
    resume: string;
}
export declare class UpdateStatusDto {
    status: JobApplicationStatus;
}
