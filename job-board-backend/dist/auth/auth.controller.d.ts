import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateUserRoleDto } from './dto/auth.dto';
import { SaveTokenDto } from './dto/save-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    saveToken(saveTokenDto: SaveTokenDto): Promise<{
        message: string;
    }>;
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
