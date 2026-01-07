import {makeGqlClient} from './gqlClient.ts'

const BOOKS_QUERY =
    `  query Books {
    books {
        id
        name 
        description 
        
    }
}`

const CREATE_MUTATION = `
    mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
    id
    name
    description
   }
  }
`;

const UPDATE_MUTATION = `
    mutation UpdateBook($input: UpdateBookInput!) {
        updateBook(input: $input) {
            id
            name
            description
        }
    }
`

const DELETE_MUTATION = `
    mutation DeleteBook($id: Int!) {
        deleteBook(id: $id)
    }
`

export type Book = {id: number; name: string; description: string}

export async function fetchBooks(token: string): Promise<Book[]> {
    const client = makeGqlClient(token)
    const res = await client.request<{books: Book[]}>(BOOKS_QUERY)
    return res.books
}

export async function createBook(token: string, input: {name: string; description: string}) {
    const client = makeGqlClient(token)
    const res = await client.request(CREATE_MUTATION, {input});
    return res.createBook as Book;
}

export async function updateBook(token: string, input: {id: number; name?: string; description?: string}) {
    const client = makeGqlClient(token)
    const res = await client.request(UPDATE_MUTATION, {input});
    return res.updateBook as Book;
}

export async function deleteBook(token: string, id: number) {
    const client = makeGqlClient(token)
    const res = await client.request<{deleteBook: boolean}>(DELETE_MUTATION, {id});
    return res.deleteBook
}