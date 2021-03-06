"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
const local_auth_guard_1 = require("./local-auth.guard");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_service_1 = require("../user/user.service");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(req, res) {
        const result = await this.authService.login(req.user);
        if (result.auth === 'fail') {
            req.session.loggedIn = false;
            res.redirect('/landing');
        }
        else {
            req.session.loggedIn = true;
            req.session.password = req.body.password;
            req.session.userId = req.user.id;
            res.redirect('/home');
        }
    }
    logIn() {
        return;
    }
    async signup(createUserDto, res) {
        return this.userService.create(createUserDto);
    }
    signUp() {
        return;
    }
    logOut(req) {
        req.session.loggedIn = false;
        return;
    }
};
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('/login'),
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Render('auth/login'),
    common_1.Get('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logIn", null);
__decorate([
    common_1.Post('/signup'),
    common_1.Render('auth/login'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    common_1.Render('auth/signup'),
    common_1.Get('/signup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Render('landing'),
    common_1.Get('/logout'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logOut", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map