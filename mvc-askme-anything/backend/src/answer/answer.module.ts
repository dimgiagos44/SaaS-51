import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { KeywordService } from 'src/keyword/keyword.service';
import { QuestionService } from 'src/question/question.service';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService, QuestionService, KeywordService]
})
export class AnswerModule {}
