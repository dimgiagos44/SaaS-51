import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(req: any, res: any): Promise<void>;
    logIn(): void;
    signup(createUserDto: CreateUserDto, res: any): Promise<import("../user/entities/user.entity").User>;
    signUp(): void;
    logOut(req: any): void;
}
