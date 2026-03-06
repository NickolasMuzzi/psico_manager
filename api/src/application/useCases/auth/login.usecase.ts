import { IPasswordHasher, ITokenGenerator } from "../../../domain/ports"
import { IUserPasswordRepository, IUserRepository } from "../../../domain/repositories"
import { LoginInputDTO } from "../../dtos/loginInputDTO"

export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHasher,
        private tokenGenerator: ITokenGenerator,
        private userPasswordRepository: IUserPasswordRepository
    ) { }

    async execute ( { email, senha }: LoginInputDTO ) {
        const user = await this.userRepository.findByEmail( email )
        if ( !user ) {
            throw new Error( 'Invalid credentials' )
        }
        const userPassword = await this.userPasswordRepository.getMostRecentPassword( user.id! )

        if ( !userPassword ) {
            throw new Error( 'Ocorreu um erro ao validar a senha do usuário. Tente novamente mais tarde.' )
        }
        const passwordMatch = await this.passwordHasher.compare(
            senha,
            userPassword.passwordHash
        )

        if ( !passwordMatch ) {
            throw new Error( 'Senha Incorreta' )
        }

        const token = this.tokenGenerator.generate( {
            id: user.id,
            cpf: user.cpf,
            nome: user.nome,
            email: user.email
        } )

        return { token }
    }
}
