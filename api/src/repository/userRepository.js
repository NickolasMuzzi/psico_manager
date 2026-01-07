const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User')

class UserRepository {
  // Buscar usuário por email para login
  async findByEmail(email) {
    try {
      const result = await pool.query(
        'SELECT * FROM "user" WHERE email = $1 AND ativo = true',
        [email]
      );
      if (result.rows[0]) {
        const userFound = new UserModel({ ...result.rows[0] })
        return userFound
      } else {
        return null
      }
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por ID
  async findById(id) {
    try {
      const result = await pool.query(
        'SELECT id, nome, email, tipo, cpf, telefone FROM "user" WHERE id = $1 AND ativo = true',
        [id]
      );
        const userFound = new UserModel({ ...result.rows[0] })
      return userFound
    } catch (error) {
      throw error;
    }
  }

  // Criar novo usuário
  /** 
   * @typedef {UserModel} userData 
   * @param {userData} userData
   *  */
  async create(userData) {
    console.log('🔍 MODEL: Criando usuário com dados:', userData);


    try {

      console.log('🔍 MODEL: Executando query INSERT...');
      const result = await pool.query(
        `INSERT INTO "user" 
       (nome, email, senha, tipo, cpf, telefone, idade, sexo, data_nascimento) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING id, nome, email, tipo, cpf, telefone`,
        [userData.nome, userData.email, hashedPassword, tipo, userData.cpf, userData.telefone, userData.idade, userData.sexo, userData.data_nascimento]
      );

      console.log('✅ MODEL: Usuário criado no banco');
      return userData

    } catch (error) {
      console.error('❌ MODEL: Erro ao criar usuário:', error.message);
      console.error('❌ MODEL: Código do erro:', error.code);
      throw error;
    }
  }

  // Verificar senha
  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Atualizar senha
  async updatePassword(userId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await pool.query(
        'UPDATE "user" SET senha = $1 WHERE id = $2',
        [hashedPassword, userId]
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = UserRepository;