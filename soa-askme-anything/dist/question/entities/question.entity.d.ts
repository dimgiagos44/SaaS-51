import { User } from '../../user/entities/user.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';
export declare class Question {
    id: number;
    text: string;
    createdAt: string;
    user: User;
    answers: Answer[];
    keywords: Keyword[];
}
