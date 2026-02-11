
import { PrismaClient } from '../../generated/prisma/client'

// Garante que apenas uma instância do PrismaClient seja criada
const prisma = new PrismaClient( { datasourceUrl: process.env.DATABASE_URL } )

export default prisma
