import { User } from '../../../domain/entities/user'
import { ICreateUserPassword } from '../../../domain/entities/userPassword'
import { IUserPasswordRepository } from '../../../domain/repositories'
import bcrypt from 'bcrypt'
export class CreateUserPasswordUseCase {
    constructor( private userPasswordRepository: IUserPasswordRepository ) { }
    async execute ( data: ICreateUserPassword ) {
        const lastPassword = await this.userPasswordRepository.getMostRecentPassword( data.user_id )
        if ( lastPassword ) {
            const compare = await bcrypt.compare( data.passwordHash, lastPassword.passwordHash )
            if ( compare === true ) {
                throw new Error( 'Utilize uma senha diferente das utilizadas anteriormente.' )
            }
        }
        const passwSalt = await bcrypt.genSalt( 10 )
        return await this.userPasswordRepository.create( { ...data, passwordHash: await bcrypt.hash( data.passwordHash, passwSalt ) } )
    }
}
