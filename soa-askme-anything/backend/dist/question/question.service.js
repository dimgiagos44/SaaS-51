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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("./entities/question.entity");
const user_entity_1 = require("../user/entities/user.entity");
const keyword_entity_1 = require("../keyword/entities/keyword.entity");
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createQuestionDto) {
        return this.manager.transaction(async (manager) => {
            const userId = createQuestionDto.user.id;
            if (!userId)
                throw new common_1.BadRequestException(`User id ${userId} is missing`);
            const user = await manager.findOne(user_entity_1.User, createQuestionDto.user.id);
            if (!user)
                throw new common_1.NotFoundException(`User with id: ${userId} not found`);
            const keywordsList = createQuestionDto.keywords;
            console.log(keywordsList);
            for (let i of keywordsList) {
                const keyword = await manager.findOne(keyword_entity_1.Keyword, i);
                if (!keyword)
                    throw new common_1.NotFoundException(`Keyword with ${i} not exists`);
            }
            const keywords = await manager.findByIds(keyword_entity_1.Keyword, keywordsList);
            const question = await manager.create(question_entity_1.Question, createQuestionDto);
            question.user = user;
            question.keywords = keywords;
            return manager.save(question);
        });
    }
    async findAll() {
        return this.manager.find(question_entity_1.Question, { loadRelationIds: true });
    }
    async findOne(id) {
        const question = await this.manager.findOne(question_entity_1.Question, id, { relations: ['user', 'keywords'] });
        if (!question)
            throw new common_1.NotFoundException(`Question with id: ${id} not found.`);
        return question;
    }
    async update(id, updateQuestionDto) {
        return this.manager.transaction(async (manager) => {
            const question = await manager.findOne(question_entity_1.Question, id);
            if (!question)
                throw new common_1.NotFoundException(`Question with id: ${id} not found`);
            manager.merge(question_entity_1.Question, question, updateQuestionDto);
            return manager.save(question);
        });
    }
    remove(id) {
        return this.manager.transaction(async (manager) => {
            const question = await manager.findOne(question_entity_1.Question, id);
            if (!question)
                throw new common_1.NotFoundException(`Question with id: ${id} not found to be deleted`);
            await manager.delete(question_entity_1.Question, id);
        });
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map