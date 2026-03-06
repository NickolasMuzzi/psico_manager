import { z } from 'zod'

export const LoginSchema = z.object( {
    email: z.email().nonoptional(),
    senha: z.string().nonoptional()
} ).strip()

export type LoginInputDTO = z.infer<typeof LoginSchema>
