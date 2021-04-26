export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    hashPassword(): Promise<void>;
}
