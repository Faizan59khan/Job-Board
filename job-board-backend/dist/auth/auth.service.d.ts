import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto, LoginDto, UpdateUserRoleDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    updateUserRole(body: UpdateUserRoleDto): Promise<{
        message: string;
    }>;
}
