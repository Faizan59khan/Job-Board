import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './job-application.entity';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { Job } from '../job/job.entity';
import { User } from 'src/auth/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobApplication, Job, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Store secret in .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JobApplicationService],
  controllers: [JobApplicationController],
})
export class JobApplicationModule {}
