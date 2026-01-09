"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const book_entity_1 = require("./book.entity");
const books_service_1 = require("./books.service");
const book_input_1 = require("./dto/book.input");
let BooksResolver = class BooksResolver {
    service;
    constructor(service) {
        this.service = service;
    }
    books() {
        return this.service.findAll();
    }
    createBook(input) {
        return this.service.create(input);
    }
    updateBook(input) {
        return this.service.update(input);
    }
    deleteBook(id) {
        return this.service.remove(id);
    }
};
exports.BooksResolver = BooksResolver;
__decorate([
    (0, graphql_1.Query)(() => [book_entity_1.Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksResolver.prototype, "books", null);
__decorate([
    (0, graphql_1.Mutation)(() => book_entity_1.Book),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_input_1.CreateBookInput]),
    __metadata("design:returntype", void 0)
], BooksResolver.prototype, "createBook", null);
__decorate([
    (0, graphql_1.Mutation)(() => book_entity_1.Book),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_input_1.UpdateBookInput]),
    __metadata("design:returntype", void 0)
], BooksResolver.prototype, "updateBook", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BooksResolver.prototype, "deleteBook", null);
exports.BooksResolver = BooksResolver = __decorate([
    (0, graphql_1.Resolver)(() => book_entity_1.Book),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksResolver);
//# sourceMappingURL=books.resolver.js.map