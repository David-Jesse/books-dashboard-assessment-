PSA: This project consists of a React SPA frontend and a NestJS GraphQL backend.
Both applications are deployed separately and communicate via a secured GraphQL API protected by Auth0

Backend - Books GraphQL API

Overview

The backend is a NestJS application written in TypeScript that exposes a GraphQL API for managing books.
It is responsible for:
- Validating authentication and authorization using Auth()
- Exposing secure GraphQL queries and mutations
- Persisting data using a SQLite database stored as a file in the repository

All API access is restricted to authenticated users.

Tech Stack
- NextJS - Server Framework
- GraphQL (Apollo) - API layer
- TypeORM - ORM for database access
- SQLite - relational database (file-based)
- Auth0 + JWT - Authentication and authorization

Data Model
    Book {
    id: number
    name: string
    description: string
    }

The book entity is mapped using TypeORM and exposed as a GraphQL ObjectType.

Authentication & Authorization

Authentication is handled using Auth0-issued JWT access tokens

Flow
1. The frontend authenticates users via Auth0
2. Auth0 issues a signed JWT access token
3. The frontend sends the token in the Authorization header:
   Authorization: Bearer <access_token>
4. The backend validates the token using Auth0's JWKS endpoint
5. Only validated requests are allowed to access GraphQL resolvers

Implementation
- Passport JWT strategy is configured with:
  1. Auth0 issuer
  2. API audience
  3. RS256 signing algorithm
- Public keys are fetched dynamically from Auth0 via JWKS
- A custom GraphQL authentication guard (GrlAuthGuard) adapts Passport authentication to the GraphQL context

All book-related resolvers are protected using this guard


GraphQL API
The GraphQL API exposes the following operations

Queries
- books - Fetch all books

Mutations
- createBook - Create a new book
- updateBook - Update an existing book
- deleteBook - Delete a book
All operations require a valid access token.

Database
The application uses SQLite with TypeORM
- The database is stored in a local file: db.sqlite
- Schema synchronization is enabled for simplicity and speed during development
- This approach satisfies the test requirement for a relational database stored within the repository

Note: In a production environment, migrations and a managed database would be preferred.

Project Structure
    src/
    auth/
    auth.module.ts
    jwt.strategy.ts      # Auth0 JWT validation
    gql-auth.guard.ts    # GraphQL auth guard
    books/
    book.entity.ts
    books.resolver.ts
    books.service.ts
    dto/
    app.module.ts
    main.ts

The structure follows NextJS best practices and keeps authentication, domain logic, and API layers clearly seperated.

Environmental Variables
The backend requires the following environment variables:
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
PORT=4000

Running Locally
npm install
npm run start: dev

The GraphQL API will be available at:
http://localhost:4000/graphql

Notes
- All GraphQL resolvers are protected by authentication guards
- Unauthorized requests will fail before reaching the resolver logic
- The backend is intentionally minimal and focused on correctness, clarity, and security as required by the test instructions
