import { DateTime } from "luxon"

export interface User {
    id?: number
    nome: string
    idade: number
    cpf: string
    sexo: string
    email: string
    telefone: string
    data_nascimento: Date
}
