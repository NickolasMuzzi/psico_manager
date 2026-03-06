import { IUserRepository } from "../../domain/repositories/IUsersRepository"
import { User } from "../../domain/entities/user"
import prisma from '../database/prisma'
import { convertDate } from "../../utils/convertDate"

export class PrismaUsersRepository implements IUserRepository {
    async create ( user: User ) {
        try {

            const usr = await prisma.user.create( { data: { ...user, cpf: user.cpf.replace( /[^a-zA-Z0-9]/g, '' ), telefone: user.telefone.replace( /[^a-zA-Z0-9]/g, '' ) } } )
            return { ...usr }
        }
        catch ( err: any ) {
            console.error( err )
            console.error( err.meta )
            throw err

        }
    }
    async findByEmail ( email: string ) {
        let userToReturn: User
        const user = await prisma.user.findFirst( { where: { email: email } } )
        if ( user && user.data_nascimento ) {
            userToReturn = { ...user }
            return userToReturn
        }
        return null
    }
    async toggleActive ( newState: boolean ) {
        throw Error( 'Not Implemented Yet' )
    }
    async update ( userId: number, newUser: User ) {
        const user = await prisma.user.update( {
            where: { id: userId }, data: {
                ...newUser,
                data_nascimento: convertDate( newUser.data_nascimento ) as Date
            }
        } )
        return newUser
    }
}
