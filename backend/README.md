## PSA

This project consists of a React single-page application (SPA) frontend and a NestJS GraphQL backend.
Both applications are deployed separately and communicate via a secured GraphQL API protected by Auth0.

---

## Backend – Books GraphQL API

### Overview

The backend is a **NestJS** application written in TypeScript that exposes a secure GraphQL API for
managing books.

It is responsible for:

- Validating authentication and authorization using Auth0-issued JWTs
- Exposing secure GraphQL queries and mutations
- Persisting data using a SQLite database stored as a file in the repository

All API access is restricted to authenticated users.

---

## Tech Stack

- **NestJS** – Server-side application framework
- **GraphQL (Apollo)** – API layer
- **TypeORM** – ORM for database access
- **SQLite** – File-based relational database
- **Auth0 + JWT** – Authentication and authorization

---

## Data Model

```ts
Book {
  id: number
  name: string
  description: string
}
