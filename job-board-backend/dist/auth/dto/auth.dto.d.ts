import { Role } from 'src/utils/helper';
export declare class RegisterDto {
    username: string;
    email: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class UpdateUserRoleDto {
    email: string;
    role: Role;
}
