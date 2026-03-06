import { Request, Response } from 'express'
import { CreateUserUseCase } from '../../../application/useCases/user/createUser.usecase'
import { ICreateUserRequest } from '../types/users.requests'
import { DateTime } from 'luxon'
import { CreateUserPasswordUseCase } from '../../../application/useCases/userPassword/createUserPassword.usecase'

class UsersController {
    constructor( private createUserUseCase: CreateUserUseCase, private createUserPasswordUseCase: CreateUserPasswordUseCase ) { }
    async handleCreateUser ( req: ICreateUserRequest, res: Response ) {
        try {
            let user = req.body
            const { senha, data_nascimento, ...usr } = user

            const userObj = await this.createUserUseCase.execute( { ...usr, data_nascimento: DateTime.fromFormat( data_nascimento, 'dd/MM/yyyy' ).toJSDate() } )

            if ( userObj && userObj.id ) {
                const userSenha = await this.createUserPasswordUseCase.execute( { user_id: userObj.id, passwordHash: senha } )
                if ( userSenha ) {
                    return res.json( { data: user, success: true } ).status( 201 )
                }
                else {
                    return res.status( 400 ).json( { message: 'Não foi possível cadastrar a senha deste usuário' } )
                }
            }
            else {
                return res.status( 400 ).json( { message: 'Não foi possível criar um usuário com os dados informados' } )
            }

        }
        catch ( err ) {
            if ( err instanceof Error ) {
                return res.status( 400 ).json( { message: err.message } )
            }
            return res.status( 500 ).json( { message: 'Internal Server Error' } )
        }

    }
}

export { UsersController }
