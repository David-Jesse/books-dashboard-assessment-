import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {Book} from './book.entity'
import {BooksService} from "./books.service";
import {CreateBookInput, UpdateBookInput} from "./dto/book.input";
import {GqlAuthGuard} from "../auth/gql.auth.guard";


@Resolver(() => Book)
//@UseGuards(GqlAuthGuard)
export class BooksResolver {
    constructor(private service: BooksService) {
    }

    @Query(() => [Book])
    books() {
        return this.service.findAll()
    }

    @Mutation(() => Book)
    createBook(@Args('input') input: CreateBookInput) {
        return this.service.create(input);
    }

    @Mutation(() => Book)
    updateBook(@Args('input') input: UpdateBookInput) {
        return this.service.update(input);
    }

    @Mutation(() => Boolean)
    deleteBook(@Args("id", {type: () => Int}) id: number) {
        return this.service.remove(id);
    }
}