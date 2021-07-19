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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const keyword_service_1 = require("./keyword/keyword.service");
const question_service_1 = require("./question/question.service");
let AppController = class AppController {
    constructor(appService, keywordService, questionService) {
        this.appService = appService;
        this.keywordService = keywordService;
        this.questionService = questionService;
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
        let dict = {};
        const keywords = await this.keywordService.findAll();
        keywords.forEach(keyword => dict[keyword.text] = 1);
        const questions = await this.questionService.findAll();
        questions.forEach(question => {
            const keywords2 = question.keywords;
            keywords2.forEach(keyword => dict[keyword.text]++);
        });
        let labels = [];
        let values = Object.values(dict);
        Object.keys(dict).forEach(key => labels.push(String(key)));
        console.log('labels = ', labels);
        console.log('values = ', values);
        return { keywords: keywords, labels: labels, values: values, dict: dict };
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
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService, keyword_service_1.KeywordService, question_service_1.QuestionService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map