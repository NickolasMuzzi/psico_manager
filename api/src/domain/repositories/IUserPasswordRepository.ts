import { User } from "../entities/user"
import { ICreateUserPassword, UserSenha } from "../entities/userPassword"

export interface IUserPasswordRepository {
    findPasswordsByUserId: ( userId: number ) => Promise<UserSenha[] | null>
    getMostRecentPassword: ( userId: number ) => Promise<UserSenha | null>
    create: ( user: ICreateUserPassword ) => Promise<UserSenha>
    resetUserPasswords: () => Promise<void>
}
