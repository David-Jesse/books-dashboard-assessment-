import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookInput, UpdateBookInput } from './dto/book.input';
export declare class BooksResolver {
    private service;
    constructor(service: BooksService);
    books(): Promise<Book[]>;
    createBook(input: CreateBookInput): Promise<Book>;
    updateBook(input: UpdateBookInput): Promise<Book>;
    deleteBook(id: number): Promise<boolean>;
}
