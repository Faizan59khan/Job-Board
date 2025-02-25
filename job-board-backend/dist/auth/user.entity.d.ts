import { Role } from 'src/utils/helper';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
}
