const express = require('express');
const db = require('./banco'); // importa o banco que você criou
const app = express();

app.use(express.json()); // permite o servidor entender JSON que chega nas requisições

// Habilita CORS para chamadas do frontend local
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Backend da barbearia rodando!');
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend da barbearia rodando!',
    serverTime: new Date().toISOString(),
  });
});

// rota pra CRIAR um agendamento
app.post('/agendamentos', (req, res) => {
  const { nome_cliente, servico, horario } = req.body;
  const stmt = db.prepare(
    'INSERT INTO agendamentos (nome_cliente, servico, horario) VALUES (?, ?, ?)'
  );
  stmt.run(nome_cliente, servico, horario);
  res.send('Agendamento salvo!');
});

// rota pra LISTAR os agendamentos
app.get('/agendamentos', (req, res) => {
  const todos = db.prepare('SELECT * FROM agendamentos').all();
  res.json(todos);
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});