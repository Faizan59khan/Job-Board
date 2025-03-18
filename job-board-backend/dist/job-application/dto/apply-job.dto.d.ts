import { JobApplicationStatus } from 'src/utils/helper';
export declare class GetPresignedUrlDto {
    fileName: string;
    fileType: string;
}
export declare class ApplyJobDto {
    jobId: number;
    resume: string;
}
export declare class UpdateStatusDto {
    status: JobApplicationStatus;
}
