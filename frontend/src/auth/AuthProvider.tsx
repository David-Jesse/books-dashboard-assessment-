import {Auth0Provider} from "@auth0/auth0-react";
import type {ReactNode} from "react";

export function AppAuthProvider({children}: { children: ReactNode }) {
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "https://books-dashboard-api"
            }}
            cacheLocation={'localstorage'}
        >
            {children}
        </Auth0Provider>
    )
}
