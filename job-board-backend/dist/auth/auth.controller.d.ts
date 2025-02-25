import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateUserRoleDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
