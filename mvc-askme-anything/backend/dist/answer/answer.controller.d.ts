import { AnswerService } from './answer.service';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { QuestionService } from "src/question/question.service";
import { KeywordService } from "src/keyword/keyword.service";
export declare class AnswerController {
    private readonly answerService;
    private readonly questionService;
    private readonly keywordService;
    constructor(answerService: AnswerService, questionService: QuestionService, keywordService: KeywordService);
    create(req: any, res: any, createAnswerDto: any): void;
    answer(req: any): Promise<{
        questions: import("../question/entities/question.entity").Question[];
        userId: any;
    } | {
        questions: any[];
        userId?: undefined;
    }>;
    findAll(): Promise<import("./entities/answer.entity").Answer[]>;
    findOne(id: string): Promise<import("./entities/answer.entity").Answer>;
    findQuestionsByUserId(userId: string): Promise<import("./entities/answer.entity").Answer[]>;
    update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<import("./entities/answer.entity").Answer>;
    remove(id: string): Promise<void>;
}
