import express from 'express';
import { connectDB } from './src/models/Modelos.js';
import animalRoutes from "./src/routes/animais.routes.js";
import adminRoutes from './src/routes/admin.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';
import pedidoAdocaoRoutes from './src/routes/adocoes.routes.js';
import doacaoRoutes from './src/routes/doacoes.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(animalRoutes);
app.use(adminRoutes);
app.use(usuarioRoutes);
app.use(pedidoAdocaoRoutes);
app.use(doacaoRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
