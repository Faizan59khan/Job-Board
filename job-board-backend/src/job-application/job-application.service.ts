import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './job-application.entity';
import { ApplyJobDto, UpdateStatusDto, GetPresignedUrlDto } from './dto/apply-job.dto';
import { Job } from '../job/job.entity';
import { User } from 'src/auth/user.entity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class JobApplicationService {
  private s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    @InjectRepository(JobApplication) private jobAppRepo: Repository<JobApplication>,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = process.env.AWS_S3_BUCKET;
  }

  async generatePresignedUrl(dto: GetPresignedUrlDto) {
    const s3Key = `resumes/${Date.now()}-${dto.fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: s3Key,
      ContentType: dto.fileType,
    });

    const presignedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 3600,
      signableHeaders: new Set(['content-type', 'content-length', 'host']),
    });
    return { presignedUrl, s3Key };
  }

  async apply(applyJobDto: ApplyJobDto, userId: number): Promise<JobApplication> {
    const { jobId, resume } = applyJobDto;

    const job = await this.jobRepo.findOne({ where: { id: jobId } });
    if (!job) throw new NotFoundException(`Job with ID ${jobId} not found`);

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const application = this.jobAppRepo.create({ job, applicant: user, resume, status: 'applied' });
    return await this.jobAppRepo.save(application);
  }

  async getApplicationsForJob(jobId: number): Promise<JobApplication[]> {
    return await this.jobAppRepo.find({ where: { job: { id: jobId } }, relations: ['applicant'] });
  }

  async updateStatus(applicationId: number, status: UpdateStatusDto): Promise<JobApplication> {
    const application = await this.jobAppRepo.findOne({ where: { id: applicationId } });
    if (!application) throw new NotFoundException(`Application with ID ${applicationId} not found`);

    application.status = status.status;
    return await this.jobAppRepo.save(application);
  }
}
