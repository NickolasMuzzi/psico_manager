import { Router } from 'express'
import { PrismaUsersRepository } from '../../repositories/users.repository'
import { CreateUserUseCase } from '../../../application/useCases/user/createUser.usecase'
import { UsersController } from '../controllers/users.controllers'
import { UserSchema } from '../../../application/dtos/userDTO'
import { validate } from '../middlewares/validateBody'
import { CreateUserPasswordUseCase } from '../../../application/useCases/userPassword/createUserPassword.usecase'
import { PrismaUserPasswordRepository } from '../../repositories/userPassword.repository'

const usersRouter = Router()

const prismaUsersRepository = new PrismaUsersRepository()
const prismaUserPasswordRepository = new PrismaUserPasswordRepository()

const createUserPasswordUseCase = new CreateUserPasswordUseCase( prismaUserPasswordRepository )
const createUserUseCase = new CreateUserUseCase( prismaUsersRepository )
const usersController = new UsersController( createUserUseCase, createUserPasswordUseCase )

usersRouter.post( '/create', validate( UserSchema ), ( req, res ) => usersController.handleCreateUser( req, res ) )


export { usersRouter }
