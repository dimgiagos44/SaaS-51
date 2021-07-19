import { AppService } from './app.service';
import { KeywordService } from './keyword/keyword.service';
import { QuestionService } from './question/question.service';
export declare class AppController {
    private readonly appService;
    private readonly keywordService;
    private readonly questionService;
    constructor(appService: AppService, keywordService: KeywordService, questionService: QuestionService);
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
}
