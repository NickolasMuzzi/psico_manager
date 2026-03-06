import { Response } from "express"
import { IPasswordHasher, ITokenGenerator } from "../../../domain/ports"
import { IUserPasswordRepository, IUserRepository } from "../../../domain/repositories"
import { BcryptHasher } from "../../auth/bcrypt-hasher.service"
import { JwtTokenService } from "../../auth/jwt-token.service"
import { ILoginRequest } from "../types/auth.requests"
import { LoginUseCase } from "../../../application/useCases/auth/login.usecase"

class AuthController {
    constructor( private loginUseCase: LoginUseCase ) { }
    async login ( req: ILoginRequest, res: Response ) {
        try {
            const token = await this.loginUseCase.execute( req.body )

            return res.cookie( 'auth', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                domain: 'localhost'
            }, ).status( 200 )
        }
        catch ( err ) {
            console.log( err )
            res.json( { success: false, error: err } ).status( 500 )
        }
    }
}
export { AuthController }
