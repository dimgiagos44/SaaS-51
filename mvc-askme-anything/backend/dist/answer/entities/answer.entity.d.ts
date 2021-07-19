import { Question } from '../../question/entities/question.entity';
import { User } from '../../user/entities/user.entity';
export declare class Answer {
    id: number;
    text: string;
    createdAt: string;
    question: Question;
    user: User;
}
