import { IUserPasswordRepository } from "../../domain/repositories/IUserPasswordRepository"
import { ICreateUserPassword, UserSenha } from "../../domain/models/userPassword"
import prisma from '../database/prisma'
import { DateTime } from "luxon"
import { convertDate } from "../../utils/convertDate"
import bcrypt from 'bcrypt'
import { User } from "../../domain/models/user"

export class PrismaUserPasswordRepository implements IUserPasswordRepository {
    async create ( user: ICreateUserPassword ) {
        const newPasswordHash = await bcrypt.hash( user.password, 10 )
        await prisma.userSenha.create( {
            data: {
                passwordHash: newPasswordHash,
                user_id: user.user_id,

            }
        } )
    }
    // async findPasswordsByUserId ( user_id: number ) {
    //     return await prisma.userSenha.findMany( { where: { user_id: user_id } } )
    // }

}
