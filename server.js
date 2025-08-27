import express from 'express';
import { connectDB } from './src/models/Modelos.js';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

//USUÁRIO → ROTA → CONTROLLER → MODEL → BANCO DE DADOS