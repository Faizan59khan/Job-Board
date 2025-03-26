import { Controller, Post, Body, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateUserRoleDto } from './dto/auth.dto';
import { SaveTokenDto } from './dto/save-token.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Save FCM token for push notifications' })
  @ApiResponse({ status: 200, description: 'FCM token saved successfully' })
  @Post('save-token')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async saveToken(@Body() saveTokenDto: SaveTokenDto) {
    return this.authService.saveToken(saveTokenDto);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'JWT Token' })
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({ status: 200, description: 'User role updated successfully' })
  @Patch('updateUserRole')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUserRole(@Body() body: UpdateUserRoleDto) {
    return this.authService.updateUserRole(body);
  }
}
