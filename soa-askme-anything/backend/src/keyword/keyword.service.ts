import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Keyword } from './entities/keyword.entity';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.create(Keyword, createKeywordDto);
      return manager.save(keyword);
    });
  }

  async findAll(): Promise<Keyword[]> {
    return this.manager.find(Keyword, { relations: ['questions'] });
  }

  async findOne(id: number): Promise<Keyword> {
    const keyword = await this.manager.findOne(Keyword, id, { relations: ['questions'] });
    if (!keyword)
      throw new NotFoundException(`Keyword with ${id} was not found.`);
    return keyword;
  }

  async findOneByText(text: string): Promise<Keyword> {
    const keyword = await this.manager.findOne(Keyword, { text: text });
    if (!keyword)
      throw new NotFoundException(`cannot find keyword with text ${text}`);
    return keyword;
  }

  async update(id: number, updateKeywordDto: UpdateKeywordDto): Promise<Keyword> {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.findOne(Keyword, id);
      if (!keyword)
        throw new NotFoundException(`Keyword with ${id} was not found`);
      manager.merge(Keyword, keyword, updateKeywordDto);
      return keyword;
    });
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const keyword = await manager.findOne(Keyword, id);
      if (!keyword)
        throw new NotFoundException(`Cannot find keyword ${id} to delete it`);
      await manager.delete(Keyword, id);
    });
  }
}
