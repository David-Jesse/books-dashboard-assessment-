import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider, defaultSystem} from '@chakra-ui/react'
import {AppAuthProvider} from "./auth/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppAuthProvider>
            <ChakraProvider value={defaultSystem}>
                <App />
            </ChakraProvider>
        </AppAuthProvider>
    </React.StrictMode>
)