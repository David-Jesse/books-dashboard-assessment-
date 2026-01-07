import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt"
import * as jwksRsa from "jwks-rsa"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const domain = process.env.AUTH0_DOMAIN;
        const audience = process.env.AUTH0_AUDIENCE; // API identifier
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            issuer: `https://${domain}/`,
            audience,
            algorithms: ['RS256'],
            secretOrKeyProvider: jwksRsa.passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${domain}/.well-known/jwks.json`,
            }),
        });
    }

    validate(payload: any) {
        return payload;
    }
}