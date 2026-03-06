import { User } from '../../../domain/entities/user'
import { IUserRepository } from '../../../domain/repositories'
export class CreateUserUseCase {
    constructor( private userRepository: IUserRepository ) { }
    async execute ( data: User ) {
        const userAlreadyExists = await this.userRepository.findByEmail( data.email )

        if ( userAlreadyExists ) {
            throw new Error( 'User already exists.' )
        }
        else {
            return await this.userRepository.create( data )
        }

    }
}
