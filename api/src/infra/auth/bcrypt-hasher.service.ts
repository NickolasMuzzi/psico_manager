import { IPasswordHasher } from "../../domain/ports/IPasswordHasher"
import bcrypt from 'bcrypt'
export class BcryptHasher implements IPasswordHasher {
    async compare ( password: string, hash: string ) {
        return bcrypt.compare( password, hash )
    }
}
