import express from 'express';
import { connectDB } from './src/models/Modelos.js';
import animalRoutes from "./src/routes/animais.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(animalRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
