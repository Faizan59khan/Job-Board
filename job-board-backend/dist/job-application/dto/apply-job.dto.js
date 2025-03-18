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
exports.UpdateStatusDto = exports.ApplyJobDto = exports.GetPresignedUrlDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetPresignedUrlDto {
}
exports.GetPresignedUrlDto = GetPresignedUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'resume.pdf', description: 'Name of the file to upload' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPresignedUrlDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'application/pdf', description: 'MIME type of the file' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPresignedUrlDto.prototype, "fileType", void 0);
class ApplyJobDto {
}
exports.ApplyJobDto = ApplyJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the job' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ApplyJobDto.prototype, "jobId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'resumes/123-resume.pdf', description: 'S3 key of the uploaded resume' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplyJobDto.prototype, "resume", void 0);
class UpdateStatusDto {
}
exports.UpdateStatusDto = UpdateStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'accepted', description: 'New status for the application' }),
    (0, class_validator_1.IsEnum)(['applied', 'shortlisted', 'rejected', 'hired']),
    __metadata("design:type", String)
], UpdateStatusDto.prototype, "status", void 0);
//# sourceMappingURL=apply-job.dto.js.map