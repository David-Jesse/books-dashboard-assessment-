import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput, UpdateBookInput } from "./dto/book.input";
export declare class BooksService {
    private repo;
    constructor(repo: Repository<Book>);
    findAll(): Promise<Book[]>;
    create(input: CreateBookInput): Promise<Book>;
    update(input: UpdateBookInput): Promise<Book>;
    remove(id: number): Promise<boolean>;
}
