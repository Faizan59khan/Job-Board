"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_application_entity_1 = require("./job-application.entity");
const job_entity_1 = require("../job/job.entity");
const user_entity_1 = require("../auth/user.entity");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const admin = require("firebase-admin");
let JobApplicationService = class JobApplicationService {
    constructor(jobAppRepo, jobRepo, userRepo) {
        this.jobAppRepo = jobAppRepo;
        this.jobRepo = jobRepo;
        this.userRepo = userRepo;
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
            });
        }
        this.s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.bucketName = process.env.AWS_S3_BUCKET;
    }
    async generatePresignedUrl(dto) {
        const s3Key = `resumes/${Date.now()}-${dto.fileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: s3Key,
            ContentType: dto.fileType,
        });
        const presignedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
            expiresIn: 3600,
            signableHeaders: new Set(['content-type', 'content-length', 'host']),
        });
        return { presignedUrl, s3Key };
    }
    async apply(applyJobDto, userId) {
        const { jobId, resume } = applyJobDto;
        const job = await this.jobRepo.findOne({ where: { id: jobId } });
        if (!job)
            throw new common_1.NotFoundException(`Job with ID ${jobId} not found`);
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        const application = this.jobAppRepo.create({ job, applicant: user, resume, status: 'applied' });
        const savedApplication = await this.jobAppRepo.save(application);
        const jobWithEmployer = await this.jobRepo.findOne({
            where: { id: jobId },
            relations: ['postedBy'],
        });
        if (jobWithEmployer?.postedBy?.fcmToken) {
            const message = {
                notification: {
                    title: 'New Job Application',
                    body: `${user.username} has applied to your job "${job.title}"`,
                },
                token: jobWithEmployer.postedBy.fcmToken,
            };
            try {
                await admin.messaging().send(message);
            }
            catch (error) {
                console.error('Error sending notification:', error);
            }
        }
        return savedApplication;
    }
    async getApplicationsForJob(jobId) {
        return await this.jobAppRepo.find({ where: { job: { id: jobId } }, relations: ['applicant'] });
    }
    async updateStatus(applicationId, status) {
        const application = await this.jobAppRepo.findOne({ where: { id: applicationId } });
        if (!application)
            throw new common_1.NotFoundException(`Application with ID ${applicationId} not found`);
        application.status = status.status;
        return await this.jobAppRepo.save(application);
    }
};
exports.JobApplicationService = JobApplicationService;
exports.JobApplicationService = JobApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_application_entity_1.JobApplication)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JobApplicationService);
//# sourceMappingURL=job-application.service.js.map