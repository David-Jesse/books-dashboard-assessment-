import {
    Button,
    Field,
    Input,
    Textarea,
} from "@chakra-ui/react";
import {
    DialogRoot,
    DialogContent,
    DialogHeader,
    DialogBody,
    DialogFooter,
    DialogTitle,
    DialogCloseTrigger,
    DialogBackdrop
} from '@chakra-ui/react/dialog'
import {useEffect, useState} from "react";
import type {Book} from "./BooksTable";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    book: Book | null;
    onCreate: (values: { name: string; description: string }) => Promise<void>;
    onUpdate: (values: {
        id: number;
        name: string;
        description: string;
    }) => Promise<void>;
};

export function BookFormModal({
                                  isOpen,
                                  onClose,
                                  book,
                                  onCreate,
                                  onUpdate,
                              }: Props) {
    const isEditMode = Boolean(book);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Populate form when editing
    useEffect(() => {
        if (book) {
            setName(book.name);
            setDescription(book.description);
        } else {
            setName("");
            setDescription("");
        }
    }, [book, isOpen]);

    async function handleSubmit() {
        setSubmitting(true);

        try {
            if (isEditMode && book) {
                await onUpdate({
                    id: book.id,
                    name,
                    description,
                });
            } else {
                await onCreate({name, description});
            }

            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()} placement={'center'}>
            <DialogBackdrop/>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Book" : "Add Book"}
                    </DialogTitle>
                    <DialogCloseTrigger/>
                </DialogHeader>

                <DialogBody>
                    <Field.Root required marginBottom={4}>
                        <Field.Label>Name</Field.Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Book name"
                        />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>Description</Field.Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Book description"
                        />
                    </Field.Root>
                </DialogBody>

                <DialogFooter>
                    <Button marginRight={3} onClick={onClose} variant="ghost">
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        loading={submitting}
                        disabled={!name.trim() || !description.trim()}
                    >
                        {isEditMode ? "Update" : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
}
