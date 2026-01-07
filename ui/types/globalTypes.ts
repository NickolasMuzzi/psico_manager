export type UserType = {
    id?: number;
    nome: string;
    idade: number;
    cpf: string;
    sexo: string;
    email: string;
    telefone: string;
    data_nascimento: Date
    tipo: string
    criado_em: Date
    ativo: boolean
}

export type BaseApiReponse<T> = {
    success: boolean,
    message: string,
    data: T
}