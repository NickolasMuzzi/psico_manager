import { LoginUseCase } from "../../application/useCases/auth/login.usecase"
import { BcryptHasher } from "../../infra/auth/bcrypt-hasher.service"
import { JwtTokenService } from "../../infra/auth/jwt-token.service"
import { AuthController } from "../../infra/http/controllers/auth.controllers"
import { PrismaUserPasswordRepository } from "../../infra/repositories/userPassword.repository"
import { PrismaUsersRepository } from "../../infra/repositories/users.repository"

export function makeAuthController () {
    const userRepository = new PrismaUsersRepository()
    const userPasswordRepository = new PrismaUserPasswordRepository()

    const passwordHasher = new BcryptHasher()
    const tokenGenerator = new JwtTokenService()

    const loginUseCase = new LoginUseCase(
        userRepository,
        passwordHasher,
        tokenGenerator,
        userPasswordRepository
    )
    return new AuthController( loginUseCase )
}
