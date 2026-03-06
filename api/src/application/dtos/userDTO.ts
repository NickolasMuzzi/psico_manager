import { z } from 'zod'
import { isValidCpf } from '../../utils/validateCpf'
import { DateTime } from 'luxon'

export const UserSchema = z.object( {
    nome: z.string()
        .nonempty( { message: 'O nome é obrigatório.' } )
        .min( 3, { message: 'O nome deve ter no mínimo 3 caracteres.' } ),

    idade: z.number()
        .int()
        .positive()
        .max( 110, { message: 'A idade máxima permitida é 110.' } ),

    cpf: z.string()
        .nonempty( { message: 'O CPF é obrigatório.' } )
        .refine( isValidCpf, {
            message: 'CPF Inválido.',
        } ),

    sexo: z.enum( ['Masculino', 'Feminino', 'Outro'], {
        message: 'O sexo é obrigatório.',
    } ),

    email: z.string()
        .nonempty( { message: 'O email é obrigatório.' } )
        .email( { message: 'Formato de email inválido.' } ),

    telefone: z.string()
        .nonempty( { message: 'O telefone é obrigatório.' } )
        .regex( /^\(\d{2}\) \d{4,5}-\d{4}$/, { message: 'Formato de telefone inválido. Use (XX) XXXXX-XXXX.' } ),

    data_nascimento: z.string()
        .nonempty( { message: 'A data de nascimento é obrigatória' } ),
    senha: z.string().nonempty( { message: 'Necessário cadastrar uma senha para o usuário' } )

} ).strip()

export type UserDTO = z.infer<typeof UserSchema>
