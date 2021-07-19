import { QuestionService } from './question.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { KeywordService } from 'src/keyword/keyword.service';
export declare class QuestionController {
    private readonly questionService;
    private readonly keywordService;
    constructor(questionService: QuestionService, keywordService: KeywordService);
    create(req: any, res: any, createQuestionDto: any): void;
    findQuestionsByUserId(userId: string): Promise<import("./entities/question.entity").Question[]>;
    askQuestion(req: any): Promise<{
        keywords: import("../keyword/entities/keyword.entity").Keyword[];
        userId: any;
    } | {
        keywords: any[];
        userId?: undefined;
    }>;
    findAllQuestions(): Promise<import("./entities/question.entity").Question[]>;
    findAll(): Promise<{
        questions: import("./entities/question.entity").Question[];
    }>;
    findOne(id: string): Promise<import("./entities/question.entity").Question>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<import("./entities/question.entity").Question>;
    remove(id: string): Promise<void>;
}
