class UserModel {
    id = 0;
    nome = "";
    idade = "";
    cpf = "";
    sexo = "";
    email = "";
    telefone = "";
    data_nascimento = "";
    senha = ""
    tipo = ""
    criado_em = new Date()
    ativo = true
    constructor({
        id = 0,
        nome = "",
        idade = "",
        cpf = "",
        sexo = "",
        email = "",
        telefone = "",
        data_nascimento = "",
        senha = "",
        tipo = "",
        criado_em = new Date(),
        ativo = true
    }) {
        if (!cpf || !email || !data_nascimento || !nome) {
            throw new Error('Dados insuficientes! Preencha todos os dados obrigatórios do user.');
        }
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
        this.sexo = sexo;
        this.email = email;
        this.telefone = telefone;
        this.data_nascimento = data_nascimento;
        this.senha = senha;
        this.tipo = tipo;
        this.criado_em = criado_em;
        this.ativo = ativo;
    }


    getUserPasssword() {
        return this.senha
    }
    setUserPassword(senha) {
        return this.senha = senha
    }

}

module.exports = UserModel