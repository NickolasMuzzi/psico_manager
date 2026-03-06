import { Request } from 'express'
import { LoginInputDTO } from '../../../application/dtos/loginInputDTO'

export interface ILoginRequest extends Request {
    body: LoginInputDTO

}
