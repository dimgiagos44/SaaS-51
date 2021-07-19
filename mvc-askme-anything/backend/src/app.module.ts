import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { KeywordModule } from './keyword/keyword.module';
import { KeywordService } from './keyword/keyword.service';
import { QuestionService } from './question/question.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    ConfigModule.forRoot(),
    QuestionModule,
    AnswerModule,
    KeywordModule,
  ],
  controllers: [AppController],
  providers: [AppService, KeywordService, QuestionService],
})
export class AppModule {}
