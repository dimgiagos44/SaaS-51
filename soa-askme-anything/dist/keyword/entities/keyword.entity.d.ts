import { Question } from '../../question/entities/question.entity';
export declare class Keyword {
    id: number;
    text: string;
    createdAt: string;
    questions: Question[];
}
