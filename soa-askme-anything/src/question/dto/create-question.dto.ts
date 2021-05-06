import { User } from '../../user/entities/user.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';

export class CreateQuestionDto {
  readonly text: string;
  readonly user: { id: number };
  readonly keywords: { id: number }[];
}
