import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Store secret in .env
      signOptions: { expiresIn: '1h' },
    }),
  ], // Register the Job entity
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService], // If needed in other modules
})
export class JobModule {}
