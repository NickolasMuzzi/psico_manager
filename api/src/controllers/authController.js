const UserModel = require('../models/User');
const UserRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');

const userRepo = new UserRepository()

class AuthController {
  // LOGIN
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Validar campos
      if (!email || !senha) {
        return res.status(400).json({
          success: false,
          message: 'Email e senha são obrigatórios'
        });
      }

      // Buscar usuário no banco
      const user = await userRepo.findByEmail(email);
     
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }


      // Verificar senha
      const isPasswordValid = await userRepo.comparePassword(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }

      // Gerar token JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          tipo: user.tipo || 'paciente',
          nome: user.nome
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Retornar sucesso (não retornar a senha)
      res.json({
        success: true,
        message: 'Login realizado com sucesso!',
        token,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          tipo: user.tipo || 'paciente',
          cpf: user.cpf,
          telefone: user.telefone,
          idade: user.idade,
          sexo: user.sexo
        }
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // REGISTRO - para criar novos usuários
  // REGISTRO - para criar novos usuários
  async register(req, res) {
    console.log('=== 🔍 INICIANDO REGISTRO ===');

    try {
      console.log('🔍 1. Dados recebidos:', JSON.stringify(req.body, null, 2));
      console.log('🔍 2. Validando campos...');
      if (!nome || !email || !senha || !cpf || !idade || !sexo || !data_nascimento) {
        console.log('❌ Campos faltando:', {
          nome: !!nome,
          email: !!email,
          senha: !!senha,
          cpf: !!cpf,
          idade: !!idade,
          sexo: !!sexo,
          data_nascimento: !!data_nascimento
        });
        return res.status(400).json({
          success: false,
          message: 'Todos os campos são obrigatórios'
        });
      }

      const newUser = new UserModel(req.body)


      const hashedPassword = bcrypt.hash(senha, process.env.BCRYPT_SALT);
      newUser.setUserPassword(hashedPassword)

      console.log('🔍 4. Criando usuário...');
      // Criar usuário
      await userRepo.create({
        nome, email, senha, tipo, cpf, telefone, idade, sexo, data_nascimento
      });

      console.log('✅ Usuário criado com sucesso:', newUser);

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        user: newUser
      });

    } catch (error) {
      console.error('❌ ERRO DETALHADO NO REGISTRO:');
      console.error('Mensagem:', error.message);
      console.error('Stack:', error.stack);
      console.error('Código:', error.code);

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        // REMOVA ESTA LINHA EM PRODUÇÃO - só para debug
        error: error.message
      });
    }
  }

  // PERFIL DO USUÁRIO LOGADO
  async getProfile(req, res) {
    try {
      const user = await userRepo.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        user
      });

    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
};

module.exports = AuthController;