import { IUserPasswordRepository } from "../../domain/repositories/IUserPasswordRepository"
import { ICreateUserPassword, UserSenha } from "../../domain/entities/userPassword"
import prisma from '../database/prisma'
import { DateTime } from "luxon"
import { convertDate } from "../../utils/convertDate"
import bcrypt from 'bcrypt'
import { User } from "../../domain/entities/user"

export class PrismaUserPasswordRepository implements IUserPasswordRepository {
    async create ( user: ICreateUserPassword ) {
        console.log(user)
        return await prisma.userSenha.create( { data: user } )
    }
    async findPasswordsByUserId ( userId: number ) {
        const passwords = await prisma.userSenha.findMany( {
            where: {
                user_id: userId
            }
        } )
        return passwords
    }
    async resetUserPasswords () {
        await prisma.userSenha.deleteMany()
        return
    }
    async getMostRecentPassword ( userId: number ) {
        return await prisma.userSenha.findFirst( {
            where: {
                user_id: userId,
                createdAt: {
                    lte: DateTime.now().toJSDate()
                }
            }
        } )
    }
}
