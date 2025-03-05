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
exports.Job = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const job_application_entity_1 = require("../job-application/job-application.entity");
let Job = class Job {
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Software Engineer', description: 'Job title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tech Corp', description: 'Company name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Remote', description: 'Job location' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5000', description: 'Salary amount' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "salary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'open', description: 'Job status' }),
    (0, typeorm_1.Column)({ default: 'open' }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => job_application_entity_1.JobApplication }),
    (0, typeorm_1.OneToMany)(() => job_application_entity_1.JobApplication, (jobApplication) => jobApplication.job),
    __metadata("design:type", Array)
], Job.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)()
], Job);
//# sourceMappingURL=job.entity.js.map