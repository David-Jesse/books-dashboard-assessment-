import {
    Box,
    Button,
    Flex,
    Spinner,
    Text,
    Table,
    useDisclosure,
    createToaster,
} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook } from '../api/books';
import { BookFormModal } from './BookFormModal';
import { ConfirmDialog } from './ConfirmDialog';

/**
 * Local Book type mirrors the GraphQL Book model.
 * Keeping it explicit here avoids leaking API concerns
 * into presentational components.
 */
export type Book = {
    id: number;
    name: string;
    description: string;
};

export function BooksTable() {
    /**
     * getAccessTokenSilently is used instead of storing tokens in state
     * to ensure we always use a fresh, valid access token for each request.
     */
    const { getAccessTokenSilently } = useAuth0();

    /**
     * Centralized toaster for user-facing feedback.
     * Errors are surfaced to the user, while detailed logs
     * are kept in the console for debugging.
     */
    const toaster = createToaster({
        placement: 'bottom-end',
    });

    // State for fetched books
    const [books, setBooks] = useState<Book[]>([]);

    // Loading indicator for initial fetch
    const [loading, setLoading] = useState(true);

    // Currently selected book for editing
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    // Book pending deletion confirmation
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

    // Chakra UI helpers for modal/dialog visibility
    const formModal = useDisclosure();
    const deleteDialog = useDisclosure();

    /**
     * Fetch books from the backend.
     * This is separated into its own function so it can be reused
     * after create/update operations if needed.
     */
    async function loadBooks() {
        try {
            setLoading(true);

            const token = await getAccessTokenSilently();
            const data = await fetchBooks(token);

            setBooks(data);
        } catch (err) {
            toaster.error({
                title: 'Failed to load books',
            });
        } finally {
            setLoading(false);
        }
    }

    /**
     * Initial data fetch on component mount.
     * The dependency array is intentionally empty because
     * authentication state is managed internally by Auth0.
     */
    useEffect(() => {
        loadBooks();
    }, []);

    /**
     * Handle creation of a new book.
     * The access token is retrieved at action time to avoid
     * stale authentication issues in long-lived components.
     */
    async function handleCreate(values: { name: string; description: string }) {
        try {
            const token = await getAccessTokenSilently();
            const book = await createBook(token, values);

            // Optimistically update local state for better UX
            setBooks((prev) => [book, ...prev]);

            toaster.success({ title: 'Book created' });
        } catch {
            toaster.error({
                title: 'Error',
                description: 'Failed to create book',
            });
        }
    }

    /**
     * Handle updating an existing book.
     * State is updated immutably to ensure React can correctly
     * detect and render the updated row.
     */
    async function handleUpdate(values: {
        id: number;
        name: string;
        description: string;
    }) {
        try {
            const token = await getAccessTokenSilently();
            const updated = await updateBook(token, values);

            setBooks((prev) =>
                prev.map((b) => (b.id === updated.id ? updated : b)),
            );

            toaster.success({
                title: 'Success',
                description: 'Book updated',
            });
        } catch (err) {
            // Detailed error logged for debugging while keeping UI feedback clean
            console.error('Update failed:', err);

            toaster.error({
                title: 'Error',
                description: 'Failed to update book',
            });
        }
    }

    /**
     * Handle deletion after user confirmation.
     * The confirmation dialog prevents accidental destructive actions.
     */
    async function handleDelete() {
        if (!bookToDelete) return;

        try {
            const token = await getAccessTokenSilently();
            await deleteBook(token, bookToDelete.id);

            // Remove deleted book from local state
            setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id));

            toaster.success({
                title: 'Success',
                description: 'Book deleted',
            });
        } catch {
            toaster.error({
                title: 'Error',
                description: 'Failed to delete book',
            });
        } finally {
            deleteDialog.onClose();
            setBookToDelete(null);
        }
    }

    // Loading state while initial data is being fetched
    if (loading) {
        return (
            <Flex justify="center" py={10}>
                <Spinner />
            </Flex>
        );
    }

    return (
        <Box>
            <Flex justify="space-between" mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                    Books
                </Text>

                <Button
                    colorScheme="blue"
                    onClick={() => {
                        setSelectedBook(null);
                        formModal.onOpen();
                    }}
                >
                    Add Book
                </Button>
            </Flex>

            {books.length === 0 ? (
                <Text>No books found.</Text>
            ) : (
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Name</Table.ColumnHeader>
                            <Table.ColumnHeader>Description</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="right">
                                Actions
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {books.map((book) => (
                            <Table.Row key={book.id}>
                                <Table.Cell>{book.name}</Table.Cell>
                                <Table.Cell>{book.description}</Table.Cell>
                                <Table.Cell>
                                    <Flex justify="flex-end" gap={2}>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                setSelectedBook(book);
                                                formModal.onOpen();
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => {
                                                setBookToDelete(book);
                                                deleteDialog.onOpen();
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}

            <BookFormModal
                isOpen={formModal.open}
                onClose={formModal.onClose}
                book={selectedBook}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
            />

            <ConfirmDialog
                isOpen={deleteDialog.open}
                onClose={deleteDialog.onClose}
                title="Delete Book"
                message={`Are you sure you want to delete "${bookToDelete?.name}"?`}
                onConfirm={handleDelete}
            />
        </Box>
    );
}