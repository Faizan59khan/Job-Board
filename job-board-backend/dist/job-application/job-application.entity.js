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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplication = void 0;
const typeorm_1 = require("typeorm");
const job_entity_1 = require("../job/job.entity");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../auth/user.entity");
let JobApplication = class JobApplication {
};
exports.JobApplication = JobApplication;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Unique ID of the application' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobApplication.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => job_entity_1.Job }),
    (0, typeorm_1.ManyToOne)(() => job_entity_1.Job, (job) => job.applications),
    __metadata("design:type", job_entity_1.Job)
], JobApplication.prototype, "job", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.applications),
    __metadata("design:type", user_entity_1.User)
], JobApplication.prototype, "applicant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uploads/resume_123.pdf', description: 'Resume file path' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobApplication.prototype, "resume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'applied', description: 'Application status' }),
    (0, typeorm_1.Column)({ default: 'applied' }),
    __metadata("design:type", String)
], JobApplication.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-04T10:00:00.000Z', description: 'Date of application' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], JobApplication.prototype, "appliedAt", void 0);
exports.JobApplication = JobApplication = __decorate([
    (0, typeorm_1.Entity)()
], JobApplication);
//# sourceMappingURL=job-application.entity.js.map