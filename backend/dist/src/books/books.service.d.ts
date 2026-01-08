import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput, UpdateBookInput } from "./dto/book.input";
export declare class BooksService {
    private repo;
    constructor(repo: Repository<Book>);
    findAll(): any;
    create(input: CreateBookInput): unknown;
    update(input: UpdateBookInput): unknown;
    remove(id: number): unknown;
}
