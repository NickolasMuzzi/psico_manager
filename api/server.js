// server.js - VERSÃO CORRIGIDA E ROBUSTA

console.log('🔍 1. Iniciando script do servidor...');

// === NOVA LINHA 1: Carregar variáveis de ambiente ===
require('dotenv').config();

const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// === NOVAS LINHAS: Importar e usar rotas de autenticação ===
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

// === NOVA LINHA 2: Importar e testar banco (assíncrono) ===
const testDatabase = async () => {
  try {
    console.log('🔍 2. Testando conexão com o banco...');
    const pool = require('./src/config/database');
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('✅ CONEXÃO COM BANCO OK! Hora do banco:', result.rows[0].current_time);
  } catch (error) {
    console.log('❌ ERRO NA CONEXÃO COM O BANCO:', error.message);
    console.log('💡 Dica: Verifique se o PostgreSQL está rodando e as credenciais no .env');
  }
};

// Chamar a função de teste do banco
testDatabase();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  console.log('✅ Rota / chamada com sucesso!');
  res.json({
    message: '🎉 SERVIDOR FUNCIONANDO!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Rota de health check para monitoramento
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Health check funcionando',
    server: 'Node.js + Express'
  });
});

// === NOVA LINHA 3: Rota para testar o banco ===
app.get('/test-db', async (req, res) => {
  try {
    const pool = require('./src/config/database');
    const result = await pool.query('SELECT NOW() as current_time');

    res.json({
      success: true,
      message: 'Conexão com banco OK!',
      database_time: result.rows[0].current_time,
      status: 'online'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro no banco de dados',
      error: error.message
    });
  }
});

// Iniciar servidor e guardar a instância para tratar erros
const server = app.listen(PORT, () => {
  // Este bloco SÓ é executado se o servidor iniciar com SUCESSO.   
  console.log('-------------------------------------------');
  console.log(`✅ SERVIDOR RODANDO NA PORTA ${PORT}`);
  console.log(`📝 Teste no navegador: http://localhost:${PORT}/`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Teste banco: http://localhost:${PORT}/test-db`);
  console.log('🔍 Servidor pronto e aguardando requisições...');
  console.log('-------------------------------------------');
});

// Listener para tratar erros que podem ocorrer DURANTE a inicialização
server.on('error', (error) => {
  // O erro 'EADDRINUSE' significa que a porta já está em uso
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ ERRO FATAL: A porta ${PORT} já está em uso.`);
    console.error('   Por favor, pare o outro processo ou escolha uma porta diferente.');
  } else {
    console.error('❌ Ocorreu um erro inesperado ao iniciar o servidor:', error);
  }
});