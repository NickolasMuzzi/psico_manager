import { ITokenGenerator } from "../../domain/ports/ITokenGenerator"
import jwt from 'jsonwebtoken'
export class JwtTokenService implements ITokenGenerator {
    generate ( payload: any ) {
        return jwt.sign( payload, process.env.JWT_SECRET!, { algorithm: 'HS256', expiresIn: '7days' } )
    }
}
