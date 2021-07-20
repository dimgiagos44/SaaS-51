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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer/answer.service");
const app_service_1 = require("./app.service");
const keyword_service_1 = require("./keyword/keyword.service");
const question_service_1 = require("./question/question.service");
let AppController = class AppController {
    constructor(appService, keywordService, questionService, answerService) {
        this.appService = appService;
        this.keywordService = keywordService;
        this.questionService = questionService;
        this.answerService = answerService;
    }
    getHello() {
        return this.appService.getHello();
    }
    landing() {
        return;
    }
    home() {
        return;
    }
    account() {
        return;
    }
    async questionsPerKeyword() {
        const dict = {};
        const keywords = await this.keywordService.findAll();
        keywords.forEach(keyword => dict[keyword.text] = 1);
        const questions = await this.questionService.findAll();
        questions.forEach(question => {
            const keywords2 = question.keywords;
            keywords2.forEach(keyword => dict[keyword.text]++);
        });
        const labels = [];
        const values = Object.values(dict);
        Object.keys(dict).forEach(key => labels.push(String(key)));
        return { keywords: keywords, labels: labels, values: values, dict: dict };
    }
    async questionsPerPeriod() {
        const questions = await this.questionService.findAll();
        let today = new Date();
        let previous7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        let previous3 = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
        let previousMonth = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000);
        let last7Questions = [];
        let last3Questions = [];
        let lastMonthQuestions = [];
        questions.forEach(question => {
            let creationDate = question.createdAt;
            const questionDay = new Date(creationDate);
            if (+questionDay <= +today && +questionDay >= +previous7) {
                last7Questions.push(question);
            }
        });
        questions.forEach(question => {
            let creationDate = question.createdAt;
            const questionDay = new Date(creationDate);
            if (+questionDay <= +today && +questionDay >= +previous3) {
                last3Questions.push(question);
            }
        });
        questions.forEach(question => {
            let creationDate = question.createdAt;
            const questionDay = new Date(creationDate);
            if (+questionDay <= +today && +questionDay >= +previousMonth) {
                lastMonthQuestions.push(question);
            }
        });
        return { last7Questions: last7Questions, last3Questions: last3Questions, lastMonthQuestions: lastMonthQuestions };
    }
    async myQuestionsMyAnswers(req) {
        const userId = req.session.userId;
        const questions = await this.questionService.findQuestionsByUserId(userId);
        const answers = await this.answerService.findAnswersByUserId(userId);
        return { questions: questions, answers: answers };
    }
    async contributionsPerDay(req) {
        const userId = req.session.userId;
        const today = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
        const myQuestions = [];
        const myAnswers = [];
        const questions = await this.questionService.findQuestionsByUserId(userId);
        const answers = await this.answerService.findAnswersByUserId(userId);
        questions.forEach(question => {
            let creationDate = question.createdAt;
            const questionDay = new Date(creationDate);
            if (+questionDay >= +today) {
                myQuestions.push(question);
            }
        });
        answers.forEach(answer => {
            let creationDate = answer.createdAt;
            const answerDay = new Date(creationDate);
            if (+answerDay >= +today) {
                myAnswers.push(answer);
            }
        });
        return { myQuestions: myQuestions, myAnswers: myAnswers };
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('/landing'),
    common_1.Render('landing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "landing", null);
__decorate([
    common_1.Get('/home'),
    common_1.Render('home'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "home", null);
__decorate([
    common_1.Get('/account'),
    common_1.Render('account'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "account", null);
__decorate([
    common_1.Get('/questionsPerKeyword'),
    common_1.Render('questions/questionsPerKeyword'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "questionsPerKeyword", null);
__decorate([
    common_1.Get('/questionsPerPeriod'),
    common_1.Render('questions/questionsPerPeriod'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "questionsPerPeriod", null);
__decorate([
    common_1.Get('/account/myQuestionsMyAnswers'),
    common_1.Render('myQuestionsMyAnswers'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "myQuestionsMyAnswers", null);
__decorate([
    common_1.Get('/account/contributionsPerDay'),
    common_1.Render('contributionsPerDay'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "contributionsPerDay", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService, keyword_service_1.KeywordService, question_service_1.QuestionService,
        answer_service_1.AnswerService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map