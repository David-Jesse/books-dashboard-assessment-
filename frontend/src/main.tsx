import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider, defaultSystem} from '@chakra-ui/react'
//import {AppAuthProvider} from "./auth/AuthProvider.tsx";
import {Auth0Provider} from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-jjjwbl7h1bfg1k0y.us.auth0.com"
            clientId="nNAmLUL7DqBShX4Ie1QVa5L4k2c5SAPK"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "https://books-dashboard-api",
                scope: "openid profile email"
            }}
        >
            <ChakraProvider value={defaultSystem}>
                <App/>
            </ChakraProvider>
        </Auth0Provider>
    </React.StrictMode>
)