## PSA

This project consists of a React single-page application (SPA) frontend and a NestJS GraphQL backend.
Both applications are deployed separately and communicate via a secured GraphQL API protected by Auth0.

---

## Frontend – Books Dashboard

### Overview

The frontend is a single-page application (SPA) built with React and TypeScript, using Vite for fast
development and optimized builds.

UI components are implemented with Chakra UI to ensure consistency and accessibility. Visual design
polish was intentionally kept minimal, as design quality was not a focus of the assessment.

The application allows authenticated administrators to:

- Sign up and sign in using Auth0
- View a list of books
- Create, edit, and delete books via a secured GraphQL API

---

## Tech Stack

- **React + TypeScript** – UI development and type safety
- **Vite** – Development server and build tooling
- **Chakra UI** – Component library for consistent, accessible UI
- **Auth0 React SDK** – Authentication and authorization
- **graphql-request** – Lightweight GraphQL client

---

## Authentication & Authorization

Authentication is handled using **Auth0**.

- The application is wrapped with an Auth0 provider
- Users authenticate via Auth0’s hosted login and signup flow
- After authentication, the frontend retrieves an access token using `getAccessTokenSilently()`
- This access token is attached to all GraphQL requests as a Bearer token

```http
Authorization: Bearer <access_token>
