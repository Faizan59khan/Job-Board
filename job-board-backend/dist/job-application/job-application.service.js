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
let JobApplicationService = class JobApplicationService {
    constructor(jobAppRepo, jobRepo, userRepo) {
        this.jobAppRepo = jobAppRepo;
        this.jobRepo = jobRepo;
        this.userRepo = userRepo;
    }
    async apply(applyJobDto) {
        const { jobId, userId, resume } = applyJobDto;
        const job = await this.jobRepo.findOne({ where: { id: jobId } });
        if (!job)
            throw new common_1.NotFoundException(`Job with ID ${jobId} not found`);
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        const application = this.jobAppRepo.create({ job, applicant: user, resume });
        return await this.jobAppRepo.save(application);
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