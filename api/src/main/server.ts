import express, { json, Request, Response } from 'express'
import { usersRouter } from '../infra'
import cors from 'cors'
import morgan from 'morgan'
import { authRoutes } from '../infra/http/routes/auth.routes'
import 'dotenv/config'
const app = express()
const port = 8000

app.disable( 'x-powered-by' )
app.use( json() )
app.enable( 'strict routing' )
app.use( cors( { origin: true, preflightContinue: true, credentials: true } ) )
app.use( morgan( 'dev' ) )
app.use( '/users', usersRouter )
app.use( '/auth', authRoutes )

app.get( '/', ( req: Request, res: Response ) => {
    res.send( 'Olá, mundo com Node.js, Express e tsx!' )
} )


app.use( ( err: any, req: Request, res: Response, next: any ) => {
    console.error( err )
    res.status( 500 ).json( { message: 'Internal server error' } )
} )

app.listen( port, () => {
    console.log( `Servidor rodando em http://localhost:${port}` )
} )
