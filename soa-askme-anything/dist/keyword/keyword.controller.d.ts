import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
export declare class KeywordController {
    private readonly keywordService;
    constructor(keywordService: KeywordService);
    create(createKeywordDto: CreateKeywordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateKeywordDto: UpdateKeywordDto): string;
    remove(id: string): string;
}
