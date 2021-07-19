import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { KeywordService } from './keyword/keyword.service';
import { QuestionService } from './question/question.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly keywordService: KeywordService, private readonly questionService: QuestionService) {}

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
    let dict = {};
    const keywords = await this.keywordService.findAll();
    keywords.forEach(keyword => dict[keyword.text] = 1);
    const questions = await this.questionService.findAll();

    questions.forEach(question => {
      const keywords2 = question.keywords;
      keywords2.forEach(keyword => dict[keyword.text]++)
    });
    let labels = [];
    let values = Object.values(dict);
    Object.keys(dict).forEach(key => labels.push(String(key)));
    console.log('labels = ', labels);
    console.log('values = ', values);
    return {keywords: keywords, labels: labels, values: values, dict: dict};
  }

}
