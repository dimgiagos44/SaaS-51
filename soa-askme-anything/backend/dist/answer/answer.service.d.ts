import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
export declare class AnswerService {
    private manager;
    constructor(manager: EntityManager);
    create(createAnswerDto: CreateAnswerDto): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: number): Promise<Answer>;
    update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer>;
    remove(id: number): Promise<void>;
}
