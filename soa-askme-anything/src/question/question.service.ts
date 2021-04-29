import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = await this.manager.create(Question, createQuestionDto);
    return this.manager.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.manager.find(Question);
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.manager.findOne(Question, id);
    if (!question) throw new NotFoundException(`Question with id: ${id} not found.`);
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      if (!question) throw new NotFoundException(`Question with id: ${id} not found`);
      manager.merge(Question, question, updateQuestionDto);
      return manager.save(question);
    });
  }

  remove(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      if (!question) throw new NotFoundException(`Question with id: ${id} not found to be deleted`);
      await manager.delete(Question, id);
    });
  }
}
