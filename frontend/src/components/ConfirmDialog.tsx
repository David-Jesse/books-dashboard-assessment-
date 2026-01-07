import {
    DialogRoot,
    DialogBody,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogBackdrop,
} from "@chakra-ui/react/dialog";
import {Button} from '@chakra-ui/react'
import {useRef} from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirm: () => void | Promise<void>;
};

export function ConfirmDialog({
                                  isOpen,
                                  onClose,
                                  title,
                                  message,
                                  onConfirm,
                              }: Props) {
    const cancelRef = useRef<HTMLButtonElement>(null);

    async function handleConfirm() {
        await onConfirm();
    }

    return (
        <DialogRoot
            open={isOpen}
            onOpenChange={(e) => !e.open && onClose()}
            placement={'center'}
            role={'alertdialog'}
            initialFocusEl={() => cancelRef.current}
        >
            <DialogBackdrop/>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle fontSize="lg" fontWeight="bold">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <DialogBody>{message}</DialogBody>

                <DialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>

        </DialogRoot>
    );
}