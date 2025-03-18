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
exports.JobApplicationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const job_application_service_1 = require("./job-application.service");
const apply_job_dto_1 = require("./dto/apply-job.dto");
const job_application_entity_1 = require("./job-application.entity");
const auth_guard_1 = require("../Guards/auth.guard");
const employer_guard_1 = require("../Guards/employer.guard");
const jobseeker_guard_1 = require("../Guards/jobseeker.guard");
const get_user_decorator_1 = require("../decorators/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
let JobApplicationController = class JobApplicationController {
    constructor(jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }
    async getPresignedUrl(dto) {
        return this.jobApplicationService.generatePresignedUrl(dto);
    }
    applyForJob(applyJobDto, user) {
        return this.jobApplicationService.apply(applyJobDto, user.id);
    }
    getApplications(jobId) {
        return this.jobApplicationService.getApplicationsForJob(jobId);
    }
    updateStatus(applicationId, status) {
        return this.jobApplicationService.updateStatus(applicationId, status);
    }
};
exports.JobApplicationController = JobApplicationController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get presigned URL for resume upload' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Presigned URL generated successfully' }),
    (0, common_1.Post)('presigned-url'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, jobseeker_guard_1.Jobseeker),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apply_job_dto_1.GetPresignedUrlDto]),
    __metadata("design:returntype", Promise)
], JobApplicationController.prototype, "getPresignedUrl", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Apply for a job' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Job application submitted', type: job_application_entity_1.JobApplication }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, jobseeker_guard_1.Jobseeker),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apply_job_dto_1.ApplyJobDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], JobApplicationController.prototype, "applyForJob", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get applications for a job' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of applications', type: [job_application_entity_1.JobApplication] }),
    (0, common_1.Get)('job/:jobId'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobApplicationController.prototype, "getApplications", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update application status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Application status updated', type: job_application_entity_1.JobApplication }),
    (0, common_1.Patch)(':applicationId'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, employer_guard_1.EmployerGuard),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, apply_job_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], JobApplicationController.prototype, "updateStatus", null);
exports.JobApplicationController = JobApplicationController = __decorate([
    (0, swagger_1.ApiTags)('job-applications'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('job-applications'),
    __metadata("design:paramtypes", [job_application_service_1.JobApplicationService])
], JobApplicationController);
//# sourceMappingURL=job-application.controller.js.map