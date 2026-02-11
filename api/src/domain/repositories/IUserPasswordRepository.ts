import { User } from "../models/user"
import { ICreateUserPassword, UserSenha } from "../models/userPassword"

export interface IUserPasswordRepository {
    findPasswordsByUserId: ( user_id: number ) => Promise<UserSenha[] | null>
    getMostRecentPassword: ( user_id: number ) => Promise<void>
    create: ( user: ICreateUserPassword ) => Promise<void>
    update: ( userId: number, newUserPassword: UserSenha ) => Promise<User | null>

}
