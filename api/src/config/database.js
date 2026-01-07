const { Pool } = require('pg');

console.log('🔍 Configurando conexão com o banco...');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'clinica_psicologia',
  password: process.env.DB_PASSWORD || 'sua_senha',
  port: process.env.DB_PORT || 5432,
});

console.log('✅ Pool de conexão criado');

// Exportar o pool CORRETAMENTE
module.exports = pool;