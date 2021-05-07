import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { User } from '../user/entities/user.entity';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.manager.transaction(async (manager) => {
      //checking for the user created this answer
      const userId = createAnswerDto.user.id;
      if (!userId) throw new BadRequestException(`user id is missing.`);
      const user = await manager.findOne(User, createAnswerDto.user.id);
      if (!user) throw new NotFoundException(`user not exists.`);
      //checking for the question this answer belongs to
      const questionId = createAnswerDto.question.id;
      if (!questionId) throw new BadRequestException(`question id is missing.`);
      const question = await manager.findOne(Question, createAnswerDto.question.id);
      if (!question) throw new NotFoundException(`this question does not exists.`);
      //creating and saving the new answer safely
      const answer = await manager.create(Answer, createAnswerDto);
      answer.user = user;
      answer.question = question;
      return manager.save(answer);
    });
  }

  async findAll(): Promise<Answer[]> {
    return this.manager.find(Answer, { loadRelationIds: true });
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.manager.findOne(Answer, id, { relations: ['user', 'question'] });
    if (!answer) throw new NotFoundException(`cannot find answer with id ${id}`);
    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    return this.manager.transaction(async (manager) => {
      const answer = await manager.findOne(Answer, id);
      if (!answer)
        throw new NotFoundException(`cannot find answer with that ${id} to update it`);
      manager.merge(Answer, answer, updateAnswerDto);
      return manager.save(answer);
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const answer = manager.findOne(Answer, id);
      if (!answer)
        throw new NotFoundException(`cannot find answer ${id} to delete it.`);
      await manager.delete(Answer, id);
    });
  }
}
