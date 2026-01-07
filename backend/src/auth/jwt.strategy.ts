import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt"
import * as jwksRsa from "jwks-rsa"

/**
 * JwtStrategy is responsible for validating incoming JWT access tokens
 * issued by Auth0 before allowing access to protected GraphQL resolvers
 *
 * This strategy uses:
 * - RS256 asymmetric signing (recommended by Auth0)
 * - JWKS (JSON Web Key Set) for key rotation support
 * - issuer and audience checks to prevent token misuse
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        // Auth0 tenant domain
        const domain = process.env.AUTH0_DOMAIN;

        // Audience represents the API identifier configured in Auth0
        // This ensures the token was explicitly issued for the backend API
        const audience = process.env.AUTH0_AUDIENCE;


        super({
            /**
             * Extract JWT from the authorization header in the form:
             * Authorization: Bearer <token>
             */
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            /**
             * Issuer validation ensures the token was issued by our Auth0 tenant
             * and not by another identity provider
             */
            issuer: `https://${domain}/`,

            /**
             * Audience validation ensures the token was intended for this API
             * preventing tokens issued for other APIs from being reused here.
             */
            audience,

            /**
             * RS256 is an asymmetric algorithm where Auth0 signs tokens
             * with a private key and we verify them using a public key
             */
            algorithms: ['RS256'],

            /**
             * JWKS provider dynamically fetches public signing keys from Auth0
             * This supports key rotation without requiring server restarts
             */
            secretOrKeyProvider: jwksRsa.passportJwtSecret({
                cache: true,  // Cache keys for performance
                rateLimit: true, // Prevent excessive JWKS requests
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${domain}/.well-known/jwks.json`,
            }),
        });
    }

    /**
     *  validate() is called after the JWT has been successfully verified
     *  Returning the payload attaches it to req.user, making it available
     *  to resolvers for authorization decisions if needed.
     */
    validate(payload: any) {
        return payload;
    }
}