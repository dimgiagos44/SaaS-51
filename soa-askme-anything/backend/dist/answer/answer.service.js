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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("./entities/answer.entity");
const user_entity_1 = require("../user/entities/user.entity");
const question_entity_1 = require("../question/entities/question.entity");
let AnswerService = class AnswerService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createAnswerDto) {
        return this.manager.transaction(async (manager) => {
            const userId = createAnswerDto.user.id;
            if (!userId)
                throw new common_1.BadRequestException(`user id is missing.`);
            const user = await manager.findOne(user_entity_1.User, createAnswerDto.user.id);
            if (!user)
                throw new common_1.NotFoundException(`user not exists.`);
            const questionId = createAnswerDto.question.id;
            if (!questionId)
                throw new common_1.BadRequestException(`question id is missing.`);
            const question = await manager.findOne(question_entity_1.Question, createAnswerDto.question.id);
            if (!question)
                throw new common_1.NotFoundException(`this question does not exists.`);
            const answer = await manager.create(answer_entity_1.Answer, createAnswerDto);
            answer.user = user;
            answer.question = question;
            return manager.save(answer);
        });
    }
    async findAll() {
        return this.manager.find(answer_entity_1.Answer, { loadRelationIds: true });
    }
    async findOne(id) {
        const answer = await this.manager.findOne(answer_entity_1.Answer, id, { relations: ['user', 'question'] });
        if (!answer)
            throw new common_1.NotFoundException(`cannot find answer with id ${id}`);
        return answer;
    }
    async update(id, updateAnswerDto) {
        return this.manager.transaction(async (manager) => {
            const answer = await manager.findOne(answer_entity_1.Answer, id);
            if (!answer)
                throw new common_1.NotFoundException(`cannot find answer with that ${id} to update it`);
            manager.merge(answer_entity_1.Answer, answer, updateAnswerDto);
            return manager.save(answer);
        });
    }
    async remove(id) {
        return this.manager.transaction(async (manager) => {
            const answer = manager.findOne(answer_entity_1.Answer, id);
            if (!answer)
                throw new common_1.NotFoundException(`cannot find answer ${id} to delete it.`);
            await manager.delete(answer_entity_1.Answer, id);
        });
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map