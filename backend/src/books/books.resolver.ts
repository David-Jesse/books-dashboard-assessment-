import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import {Book} from './book.entity';
import {BooksService} from './books.service';
import {CreateBookInput, UpdateBookInput} from './dto/book.input';
import {GqlAuthGuard} from '../auth/gql.auth.guard';

/**
 * BooksResolver defines the GraphQL API surface for Book-related operations.
 *
 * This layer is intentionally kept thin:
 * - It handles GraphQL-specific concerns (queries, mutations, arguments)
 * - It delegates all business logic and persistence to the service layer
 */
@Resolver(() => Book)
@UseGuards(GqlAuthGuard) // Re-enable to protect all book operations
export class BooksResolver {
    constructor(
        // Inject the service responsible for business logic and data access
        private service: BooksService,
    ) {
    }

    /**
     * Fetch all books.
     *
     * This query is intentionally simple and delegates sorting and retrieval
     * to the service layer to keep the resolver focused on GraphQL concerns.
     */
    @Query(() => [Book])
    books() {
        return this.service.findAll();
    }

    /**
     * Create a new book.
     *
     * Input validation and structure are enforced via the CreateBookInput DTO,
     * ensuring type safety and a clear GraphQL contract.
     */
    @Mutation(() => Book)
    createBook(@Args('input') input: CreateBookInput) {
        return this.service.create(input);
    }

    /**
     * Update an existing book.
     *
     * Partial updates are supported via UpdateBookInput,
     * allowing clients to modify only the fields they need.
     */
    @Mutation(() => Book)
    updateBook(@Args('input') input: UpdateBookInput) {
        return this.service.update(input);
    }

    /**
     * Delete a book by ID.
     *
     * The ID is explicitly typed as an Int to match the GraphQL schema
     * and avoid ambiguity between string and numeric identifiers.
     */
    @Mutation(() => Boolean)
    deleteBook(@Args('id', {type: () => Int}) id: number) {
        return this.service.remove(id);
    }
}
