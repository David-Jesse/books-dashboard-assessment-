import {Button, Heading, Text, Container, Flex, Spinner, Box} from '@chakra-ui/react'
import {useAuth0} from "@auth0/auth0-react";
import {BooksTable} from './components/BooksTable.tsx'

export default function App() {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
        isLoading,
    } = useAuth0();

    if (isLoading) {
        return (
            <Flex minH={'100vh'} align={'center'} justify={'center'}>
                <Spinner size={'lg'}/>
            </Flex>
        )
    }

    return (
        <Container maxW={'5xl'} py={10}>
            <Flex justify={'space-between'} align={'center'} mb={8}>
                <Heading size={'lg'}>Books Dashboard</Heading>

                {!isAuthenticated ? (
                    <Button onClick={() => loginWithRedirect()}>Sign in / Sign up</Button>
                ) : (
                    <Flex align={'center'} gap={3}>
                        <Text fontSize={'sm'}>{user?.email}</Text>
                        <Button
                            variant={'outline'}
                            onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}
                        >
                            Logout
                        </Button>
                    </Flex>
                )}
            </Flex>

            {!isAuthenticated ? (
                <Box p={6} borderWidth={'1px'} borderRadius={'md'}>
                    <Text>You must sign in to manage books.</Text>
                </Box>
            ) : (
                <BooksTable/>
            )}
        </Container>
    )
}