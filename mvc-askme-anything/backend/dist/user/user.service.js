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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createUserDto) {
        const user = await this.manager.create(user_entity_1.User, createUserDto);
        return this.manager.save(user);
    }
    async findAll() {
        return this.manager.find(user_entity_1.User);
    }
    async findOne(id) {
        const user = await this.manager.findOne(user_entity_1.User, id);
        if (!user)
            throw new common_1.NotFoundException(`User with id: ${id} not found!`);
        return user;
    }
    async findOneByUsername(username) {
        const user = await this.manager.findOne(user_entity_1.User, { username: username });
        if (!user)
            throw new common_1.NotFoundException(`User with username: ${username} not found`);
        return user;
    }
    async update(id, updateUserDto) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user)
                throw new common_1.NotFoundException(`User with id: ${id} not found`);
            const passwordChanged = updateUserDto.password;
            if (!passwordChanged) {
                manager.merge(user_entity_1.User, user, updateUserDto);
                return manager.save(user);
            }
            const passwordChangedHashed = bcrypt.hash(passwordChanged, 10);
            updateUserDto.password = await passwordChangedHashed;
            manager.merge(user_entity_1.User, user, updateUserDto);
            return manager.save(user);
        });
    }
    async remove(id) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user)
                throw new common_1.NotFoundException(`User with id: ${id} not found to be deleted`);
            await manager.delete(user_entity_1.User, id);
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map