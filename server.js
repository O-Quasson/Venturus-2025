import express from 'express';
import { connectDB } from './src/models/Modelos.js';
import animalRoutes from "./src/routes/animais.routes.js";
import adminRoutes from './src/routes/admin.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js'

const app = express();
const port = 3000;

app.use(express.json());

app.use(animalRoutes);
app.use(adminRoutes);
app.use(usuarioRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

//daisy daisy
//give me your answer do
//im half crazy
//all for the love of you
