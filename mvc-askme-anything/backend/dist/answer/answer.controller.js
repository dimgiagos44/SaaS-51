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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
const update_answer_dto_1 = require("./dto/update-answer.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const question_service_1 = require("../question/question.service");
const keyword_service_1 = require("../keyword/keyword.service");
let AnswerController = class AnswerController {
    constructor(answerService, questionService, keywordService) {
        this.answerService = answerService;
        this.questionService = questionService;
        this.keywordService = keywordService;
    }
    create(req, res, createAnswerDto) {
        const createAnswerDto2 = {
            text: createAnswerDto.text,
            user: {
                id: Number(createAnswerDto.userId)
            },
            question: {
                id: Number(createAnswerDto.question)
            }
        };
        if (req.session.loggedIn) {
            const answer = this.answerService.create(createAnswerDto2);
            res.redirect('/home');
        }
        else {
            res.redirect('/answer/new');
        }
    }
    answer(req) {
        const questions = this.questionService.findAll();
        return questions.then(result => result ? { questions: result, userId: req.session.userId } : { questions: [] });
    }
    findAll() {
        return this.answerService.findAll();
    }
    findOne(id) {
        return this.answerService.findOne(+id);
    }
    findQuestionsByUserId(userId) {
        return this.answerService.findAnswersByUserId(+userId);
    }
    update(id, updateAnswerDto) {
        return this.answerService.update(+id, updateAnswerDto);
    }
    remove(id) {
        return this.answerService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Request()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "create", null);
__decorate([
    common_1.Get('/new'),
    common_1.Render('answers/answerQuestion'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "answer", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findOne", null);
__decorate([
    common_1.Get('/user/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findQuestionsByUserId", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_answer_dto_1.UpdateAnswerDto]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "remove", null);
AnswerController = __decorate([
    common_1.Controller('answer'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService, question_service_1.QuestionService, keyword_service_1.KeywordService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map