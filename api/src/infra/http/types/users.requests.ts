import { Request } from 'express'
import { UserDTO } from '../../../application/dtos/userDTO'

export interface ICreateUserRequest extends Request {
    body: UserDTO

}
