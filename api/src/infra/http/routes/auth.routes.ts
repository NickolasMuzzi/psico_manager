import { Router } from 'express'
import { AuthController } from '../controllers/auth.controllers'
import { makeAuthController } from '../../../main/factories/auth.factory'
import { LoginSchema } from '../../../application/dtos/loginInputDTO'
import { validate } from '../middlewares/validateBody'


const authRoutes = Router()
const authController: AuthController = makeAuthController()

authRoutes.use( '/login', validate( LoginSchema ), ( req, res ) => authController.login( req, res ) )

export { authRoutes }
