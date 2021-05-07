import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(createAnswerDto: CreateAnswerDto): Promise<import("./entities/answer.entity").Answer>;
    findAll(): Promise<import("./entities/answer.entity").Answer[]>;
    findOne(id: string): Promise<import("./entities/answer.entity").Answer>;
    update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<import("./entities/answer.entity").Answer>;
    remove(id: string): Promise<void>;
}
