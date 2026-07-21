const Database = require('better-sqlite3');
const db = new Database('barbearia.db'); // cria o arquivo barbearia.db sozinho

// cria a tabela se ela não existir ainda
db.exec(`
  CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_cliente TEXT NOT NULL,
    servico TEXT NOT NULL,
    horario TEXT NOT NULL
  )
`);

module.exports = db;