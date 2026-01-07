import {Button, Heading, Text, Container, Flex, Stack} from '@chakra-ui/react'
import {useAuth0} from "@auth0/auth0-react";
//import {BooksTable} from './components/BooksTable.tsx'

export default function App() {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
        isLoading,
    } = useAuth0();

    if (isLoading) return <Text>Loading...</Text>

    return (
        <Stack gap={4} padding={8}>
            <Heading>Auth0 Test</Heading>

            {!isAuthenticated ? (
                <Button onClick={() => loginWithRedirect()}>
                    Sign In / Sign Up
                </Button>
            ) : (
                <>
                    <Text>
                        Logged in as: {user?.email}
                    </Text>
                    <Button
                        onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}
                    >
                        logout
                    </Button>
                </>
            )}
        </Stack>
    )
}