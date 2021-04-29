import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(createAnswerDto: CreateAnswerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAnswerDto: UpdateAnswerDto): string;
    remove(id: string): string;
}
