import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Book} from './book.entity'
import {CreateBookInput, UpdateBookInput} from "./dto/book.input";

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

    findAll() {
        return this.repo.find({order: {id: "DESC"}})
    }

    async create(input: CreateBookInput) {
        const book = this.repo.create(input)
        return this.repo.save(book)
    }

    async update(input: UpdateBookInput) {
        const book = await this.repo.findOneBy({id: input.id})
        if (!book) throw new NotFoundException("Book not found")

        if (typeof input.name === "string") book.name = input.name
        if (typeof input.description === "string") book.description = input.description

        return this.repo.save(book)
    }

    async remove(id: number) {
        const book = await this.repo.findOneBy({id});
        if (!book) throw new NotFoundException("Book not found")
        await this.repo.remove(book)
        return true;
    }
}