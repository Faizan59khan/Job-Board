import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Store secret in .env
      signOptions: { expiresIn: '1h' },
    }),
  ], // Register the Job entity
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // Export JwtModule for use in other modules
})
export class AuthModule {}
