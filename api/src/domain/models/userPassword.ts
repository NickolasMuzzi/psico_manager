import { DateTime } from "luxon"

export type UserSenha = {
    id: string
    user_id: number
    passwordHash: string
    createdAt: DateTime
    updatedAt: DateTime
}

export interface ICreateUserPassword {
    user_id: number
    password: string
}
