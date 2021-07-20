import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Res, Render } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { KeywordService } from 'src/keyword/keyword.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService, private readonly keywordService: KeywordService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Res() res, @Body() createQuestionDto) {
    const keywordsField = createQuestionDto.keywords;
    const keywords2 = [];
    keywordsField.forEach(key => keywords2.push({id: Number(key)}));
    const createQuestionDto2 = {
      title: createQuestionDto.title,
      text: createQuestionDto.text,
      user:{
        id: Number(createQuestionDto.userId)
      },
      keywords: keywords2
    };
    if(req.session.loggedIn){
      const question =  this.questionService.create(createQuestionDto2);
      res.redirect('/home');
    }
    else{
      res.redirect('/question/ask')
    }
  }

  @Get('/user/:userId')
  findQuestionsByUserId(@Param('userId') userId: string) {
    return this.questionService.findQuestionsByUserId(+userId);
  }

  @Get('/ask')
  @Render('questions/askQuestion')
  askQuestion(@Request() req) {
    return this.keywordService.findAll().then((result) => result ? { keywords: result, userId: req.session.userId } : { keywords: [] });
  }

  @Post('/all')
  findAllQuestions() {
    return this.questionService.findAll();
  }

  @Get()
  @Render('questions/allQuestions')
  findAll() {
    return this.questionService.findAll().then((result) => result ? { questions: result } : { questions: [] });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
