import { BooksService } from './books.service';
import { CreateBookInput, UpdateBookInput } from './dto/book.input';
export declare class BooksResolver {
    private service;
    constructor(service: BooksService);
    books(): any;
    createBook(input: CreateBookInput): unknown;
    updateBook(input: UpdateBookInput): unknown;
    deleteBook(id: number): unknown;
}
