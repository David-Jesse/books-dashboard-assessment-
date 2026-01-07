Frontend - Books Dashboard

Overview
The frontend is a single-page application (SPA) built with React and TypeScript using Vite for fast development
and builds.
UI components are implemented with Chakra UI to ensure consistency and accessibility without focusing on visual
design, as required by the test.

The application allows authenticated admins to
- Sign up and sign in using Auth0
- View a list of books
- Create, edit, and delete books via a GraphQL API

Tech Stack
- React + TypeScript - UI and type safety
- Vite - Development server and build tool
- Chakra UI - Component Library
- Auth0 React SDK - authentication and authorization
- graphql-request - lightweight GraphQL client

Authentication & Authorization
Authentication is handle using Auth0
- The application is wrapped in an AuthProvider
- Users authenticate via Auth0's hosted login/signup flow
- After authentication, the frontend retrieves an access token using getAccessTokenSilently()
- This token is sent as a Bearer token in the Authorization header of all GraphQL requests

    Authorization: Bearer <access_token>

Access to the dashboard and all GraphQL operations is restricted to authenticated users only.

GraphQL Integration
The frontend communicates with the backend exclusively through GraphQL
- The lightweight GraphQL client (graphql-request) is used
- A new client instance is created as per request to ensure the latest access token is always used
- All book operations (fetch, create, update, delete) are implemented as GraphQL queries and mutations

This approach avoids stale authentication state and keeps API interactions predictable and secure.

Application Structure
src/
api/
gqlClient.ts        # GraphQL client setup
books.ts            # Book queries and mutations
auth/
AuthProvider.tsx    # Auth0 provider wrapper
components/
BooksTable.tsx      # Book list and actions
BookFormModal.tsx   # Create / edit book modal
ConfirmDialog.tsx   # Delete confirmation dialog
App.tsx
main.tsx


Environmental Variables
The frontend relies on the following environmental variables
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
VITE_API_URL=

All variables follow Vite's required VITE_ prefix convention

Running Locally
npm install
npm run dev

The application will be available at:
http://localhost:5173

Notes:
- The frontend assumes the GraphQL API is protected and will reject unauthenticated requests
- Error states and loading states are handled defensively to ensure a stable user experience
- Design polish was intentionally kept minimal per the instructions given