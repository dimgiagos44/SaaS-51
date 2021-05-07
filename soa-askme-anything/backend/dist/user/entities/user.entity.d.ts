import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    hashPassword(): Promise<void>;
    questions: Question[];
    answers: Answer[];
}
