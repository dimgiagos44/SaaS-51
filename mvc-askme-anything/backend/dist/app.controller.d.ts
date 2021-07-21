import { AnswerService } from './answer/answer.service';
import { AppService } from './app.service';
import { KeywordService } from './keyword/keyword.service';
import { QuestionService } from './question/question.service';
import { UserService } from './user/user.service';
export declare class AppController {
    private readonly appService;
    private readonly keywordService;
    private readonly questionService;
    private readonly answerService;
    private readonly userService;
    constructor(appService: AppService, keywordService: KeywordService, questionService: QuestionService, answerService: AnswerService, userService: UserService);
    getHello(): string;
    landing(): void;
    home(): void;
    account(): void;
    questionsPerKeyword(): Promise<{
        keywords: import("./keyword/entities/keyword.entity").Keyword[];
        labels: any[];
        values: unknown[];
        dict: {};
    }>;
    questionsPerPeriod(): Promise<{
        last7Questions: any[];
        last3Questions: any[];
        lastMonthQuestions: any[];
    }>;
    myQuestionsMyAnswers(req: any): Promise<{
        questions: import("./question/entities/question.entity").Question[];
        answers: import("./answer/entities/answer.entity").Answer[];
    }>;
    contributionsPerDay(req: any): Promise<{
        myQuestions: any[];
        myAnswers: any[];
    }>;
    myInfo(req: any): Promise<{
        info: import("./user/entities/user.entity").User;
        password: any;
    }>;
}
