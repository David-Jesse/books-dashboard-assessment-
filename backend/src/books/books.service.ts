import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Book} from './book.entity'
import {CreateBookInput, UpdateBookInput} from "./dto/book.input";

/**
 * BooksService contains the business logic for managing Book entities.
 * All database interactions are centralized here to keep resolvers thin
 * and focused on GraphQL concerns only.
 */

@Injectable()
export class BooksService {
    // Inject the TypeORM repository for Book entities
    constructor(@InjectRepository(Book) private repo: Repository<Book>) {}


    /**
     * Fetch all books ordered by most recently created.
     * Sorting at the database level avoids unnecessary work on the frontend
     */
    findAll() {
        return this.repo.find({order: {id: "DESC"}})
    }

    /**
     * Create and persist a new Book record
     * TypeORM's create() is used to ensure entity-level hooks and defaults
     * are applied before saving
     */

    async create(input: CreateBookInput) {
        const book = this.repo.create(input)
        return this.repo.save(book)
    }


    /**
     * Update an existing Book record
     *
     * This method intentionally uses a "find + mutate + save" pattern
     * instead of repository.update() to:
     * - ensure the entity exists
     * - trigger entity lifecycle hooks
     * - avoid silent failures when partial data is provided
     */
    async update(input: UpdateBookInput) {
        const book = await this.repo.findOneBy({id: input.id})

        if (!book) {
            // Explicit error ensures the client receives a clear signal
            // Instead of silently failing or returning null
            throw new NotFoundException("Book not found")
        }

        /**
         * Fields are updated conditionally to support partial updates and avoid
         * overwriting existing values with undefined
         */
        if (typeof input.name === "string") book.name = input.name
        if (typeof input.description === "string") book.description = input.description

        return this.repo.save(book)
    }

    /**
     * Delete a Book record by ID
     * The existence check ensures consistent error handling
     * and prevents no-op deletes
     * @param id
     */

    async remove(id: number) {
        const book = await this.repo.findOneBy({id});
        if (!book) throw new NotFoundException("Book not found")
        await this.repo.remove(book)
        return true;
    }
}