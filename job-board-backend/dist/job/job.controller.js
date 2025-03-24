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
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const job_service_1 = require("./job.service");
const job_entity_1 = require("./job.entity");
const create_job_dto_1 = require("./dto/create-job.dto");
const auth_guard_1 = require("../Guards/auth.guard");
const user_entity_1 = require("../auth/user.entity");
const get_user_decorator_1 = require("../decorators/get-user.decorator");
let JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    getAllJobs() {
        return this.jobService.findAll();
    }
    getEmployerJobs(user) {
        return this.jobService.findByEmployer(user.id);
    }
    createJob(jobData, user) {
        return this.jobService.create(jobData, user.id);
    }
};
exports.JobController = JobController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all jobs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of jobs', type: [job_entity_1.Job] }),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getAllJobs", null);
__decorate([
    (0, common_1.Get)('employer'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getEmployerJobs", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new job' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Job created', type: job_entity_1.Job }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
exports.JobController = JobController = __decorate([
    (0, swagger_1.ApiTags)('job'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('job'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
//# sourceMappingURL=job.controller.js.map