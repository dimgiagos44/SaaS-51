import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';
import { User } from '../user/entities/user.entity';
import { Keyword } from '../keyword/entities/keyword.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.manager.transaction(async (manager) => {
      //checking if user made the question is OK
      const userId = createQuestionDto.user.id;
      if (!userId)
        throw new BadRequestException(`User id ${userId} is missing`);
      const user = await manager.findOne(User, createQuestionDto.user.id);
      if (!user)
        throw new NotFoundException(`User with id: ${userId} not found`);
      //checking if keywords attached to the question exist
      const keywordsList = createQuestionDto.keywords;
      console.log(keywordsList);
      for (let i of keywordsList) {
        const keyword = await manager.findOne(Keyword, i);
        if (!keyword)
          throw new NotFoundException(`Keyword with ${i} not exists`);
      }
      const keywords = await manager.findByIds(Keyword, keywordsList);
      const question = await manager.create(Question, createQuestionDto);
      question.user = user;
      question.keywords = keywords;
      return manager.save(question);
    });
  }

  async findAll(): Promise<Question[]> {
    return this.manager.find(Question, { loadRelationIds: true });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.manager.findOne(Question, id, { relations: ['user', 'keywords'] });
    if (!question)
      throw new NotFoundException(`Question with id: ${id} not found.`);
    return question;
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      if (!question)
        throw new NotFoundException(`Question with id: ${id} not found`);
      manager.merge(Question, question, updateQuestionDto);
      return manager.save(question);
    });
  }

  remove(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      if (!question)
        throw new NotFoundException(
          `Question with id: ${id} not found to be deleted`,
        );
      await manager.delete(Question, id);
    });
  }
}
