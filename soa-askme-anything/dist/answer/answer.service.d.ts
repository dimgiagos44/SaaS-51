import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerService {
    create(createAnswerDto: CreateAnswerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAnswerDto: UpdateAnswerDto): string;
    remove(id: number): string;
}
