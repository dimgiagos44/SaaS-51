export declare class CreateQuestionDto {
    readonly title: string;
    readonly text: string;
    readonly user: {
        id: number;
    };
    readonly keywords: {
        id: number;
    }[];
}
