import { Controller, Get, Render, Request } from '@nestjs/common';
import { AnswerService } from './answer/answer.service';
import { AppService } from './app.service';
import { KeywordService } from './keyword/keyword.service';
import { QuestionService } from './question/question.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly keywordService: KeywordService, private readonly questionService: QuestionService,
    private readonly answerService: AnswerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/landing')
  @Render('landing')
  landing(): void {
    return;
  }

  @Get('/home')
  @Render('home')
  home(): void {
    return;
  }

  @Get('/account')
  @Render('account')
  account(): void {
    return;
  }

  @Get('/questionsPerKeyword')
  @Render('questions/questionsPerKeyword')
  async questionsPerKeyword()  {
    const dict = {};
    const keywords = await this.keywordService.findAll();
    keywords.forEach(keyword => dict[keyword.text] = 1);
    const questions = await this.questionService.findAll();

    questions.forEach(question => {
      const keywords2 = question.keywords;
      keywords2.forEach(keyword => dict[keyword.text]++)
    });
    const labels = [];
    const values = Object.values(dict);
    Object.keys(dict).forEach(key => labels.push(String(key)));
    return {keywords: keywords, labels: labels, values: values, dict: dict};
  }

  @Get('/questionsPerPeriod')
  @Render('questions/questionsPerPeriod')
  async questionsPerPeriod() {
    //questions of last 7 days
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
          if (+questionDay <= +today && +questionDay >= +previous7){
            last7Questions.push(question);
          }
        });
        questions.forEach(question => {
          let creationDate = question.createdAt;
          const questionDay = new Date(creationDate);
          if (+questionDay <= +today && +questionDay >= +previous3){
            last3Questions.push(question);
          }
        });
        questions.forEach(question => {
          let creationDate = question.createdAt;
          const questionDay = new Date(creationDate);
          if (+questionDay <= +today && +questionDay >= +previousMonth){
            lastMonthQuestions.push(question);
          }
        });
    return {last7Questions: last7Questions, last3Questions: last3Questions, lastMonthQuestions: lastMonthQuestions}
  }

  @Get('/account/myQuestionsMyAnswers')
  @Render('myQuestionsMyAnswers')
  async myQuestionsMyAnswers(@Request() req) {
    const userId = req.session.userId;
    const questions = await this.questionService.findQuestionsByUserId(userId);
    const answers = await this.answerService.findAnswersByUserId(userId);
    return {questions: questions, answers: answers};
  }

  @Get('/account/contributionsPerDay')
  @Render('contributionsPerDay')
  async contributionsPerDay(@Request() req) {
    const userId = req.session.userId;
    const today = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000); //yesterday
    const myQuestions = [];
    const myAnswers = [];
    const questions = await this.questionService.findQuestionsByUserId(userId);
    const answers = await this.answerService.findAnswersByUserId(userId);
    questions.forEach(question => {
      let creationDate = question.createdAt;
      const questionDay = new Date(creationDate);
      if (+questionDay >= +today ){
        myQuestions.push(question);
      }
    });
    answers.forEach(answer => {
      let creationDate = answer.createdAt;
      const answerDay = new Date(creationDate);
      if (+answerDay >= +today ){
        myAnswers.push(answer);
      }
    });
    return {myQuestions: myQuestions, myAnswers: myAnswers};
  }

}
