import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
export declare class KeywordController {
    private readonly keywordService;
    constructor(keywordService: KeywordService);
    create(createKeywordDto: CreateKeywordDto): Promise<import("./entities/keyword.entity").Keyword>;
    findAll(): Promise<import("./entities/keyword.entity").Keyword[]>;
    findOne(id: string): Promise<import("./entities/keyword.entity").Keyword>;
    findOneByText(text: string): Promise<import("./entities/keyword.entity").Keyword>;
    update(id: string, updateKeywordDto: UpdateKeywordDto): Promise<import("./entities/keyword.entity").Keyword>;
    remove(id: string): Promise<void>;
}
