import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { EntityManager } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
export declare class KeywordService {
    private manager;
    constructor(manager: EntityManager);
    create(createKeywordDto: CreateKeywordDto): Promise<Keyword>;
    findAll(): Promise<Keyword[]>;
    findOne(id: number): Promise<Keyword>;
    findOneByText(text: string): Promise<Keyword>;
    update(id: number, updateKeywordDto: UpdateKeywordDto): Promise<Keyword>;
    remove(id: number): Promise<void>;
}
