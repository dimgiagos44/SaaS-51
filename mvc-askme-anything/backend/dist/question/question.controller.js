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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const update_question_dto_1 = require("./dto/update-question.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const keyword_service_1 = require("../keyword/keyword.service");
let QuestionController = class QuestionController {
    constructor(questionService, keywordService) {
        this.questionService = questionService;
        this.keywordService = keywordService;
    }
    create(req, res, createQuestionDto) {
        const keywordsField = createQuestionDto.keywords;
        const keywords2 = [];
        keywordsField.forEach(key => keywords2.push({ id: Number(key) }));
        const createQuestionDto2 = {
            title: createQuestionDto.title,
            text: createQuestionDto.text,
            user: {
                id: Number(createQuestionDto.userId)
            },
            keywords: keywords2
        };
        if (req.session.loggedIn) {
            const question = this.questionService.create(createQuestionDto2);
            res.redirect('/home');
        }
        else {
            res.redirect('/question/ask');
        }
    }
    findQuestionsByUserId(userId) {
        return this.questionService.findQuestionsByUserId(+userId);
    }
    askQuestion(req) {
        return this.keywordService.findAll().then((result) => result ? { keywords: result, userId: req.session.userId } : { keywords: [] });
    }
    findAllQuestions() {
        return this.questionService.findAll();
    }
    findAll() {
        return this.questionService.findAll().then((result) => result ? { questions: result } : { questions: [] });
    }
    findOne(id) {
        return this.questionService.findOne(+id);
    }
    update(id, updateQuestionDto) {
        return this.questionService.update(+id, updateQuestionDto);
    }
    remove(id) {
        return this.questionService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Request()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "create", null);
__decorate([
    common_1.Get('/user/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findQuestionsByUserId", null);
__decorate([
    common_1.Get('/ask'),
    common_1.Render('questions/askQuestion'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "askQuestion", null);
__decorate([
    common_1.Post('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findAllQuestions", null);
__decorate([
    common_1.Get(),
    common_1.Render('questions/allQuestions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "remove", null);
QuestionController = __decorate([
    common_1.Controller('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService, keyword_service_1.KeywordService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map