import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Render, Request, Res } from "@nestjs/common";
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuestionService } from "src/question/question.service";
import { KeywordService } from "src/keyword/keyword.service";

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService, private readonly questionService: QuestionService, private readonly keywordService: KeywordService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Res() res, @Body() createAnswerDto) {
    const createAnswerDto2 = {
      text: createAnswerDto.text,
      user: {
        id: Number(createAnswerDto.userId)
      },
      question: {
        id: Number(createAnswerDto.question)
      }
    };
    if (req.session.loggedIn){
      const answer = this.answerService.create(createAnswerDto2);
      res.redirect('/home');
    }
    else{
      res.redirect('/answer/new');
    }
  }

  @Get('/new')
  @Render('answers/answerQuestion')
  answer(@Request() req){
    const questions = this.questionService.findAll();
    return questions.then(result => result ? {questions: result, userId: req.session.userId} : {questions: []});
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @Get('/user/:userId')
  findQuestionsByUserId(@Param('userId') userId: string) {
    return this.answerService.findAnswersByUserId(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
