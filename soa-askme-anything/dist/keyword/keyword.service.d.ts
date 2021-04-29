import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
export declare class KeywordService {
    create(createKeywordDto: CreateKeywordDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateKeywordDto: UpdateKeywordDto): string;
    remove(id: number): string;
}
