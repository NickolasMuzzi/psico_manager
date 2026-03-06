import { User } from "../entities"

export interface IUserRepository {
    findByEmail: ( email: string ) => Promise<User | null>
    toggleActive: ( newState: boolean ) => Promise<void>
    create: ( user: User ) => Promise<User>
    update: ( userId: number, newUser: User ) => Promise<User | null>
}
