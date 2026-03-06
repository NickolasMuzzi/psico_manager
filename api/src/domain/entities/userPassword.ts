export type UserSenha = {
    id: string
    user_id: number
    passwordHash: string
    createdAt: Date
    updatedAt: Date
}

export interface ICreateUserPassword {
    user_id: number
    passwordHash: string
}
