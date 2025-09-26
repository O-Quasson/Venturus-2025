import express from 'express';
import { connectDB } from './src/models/Modelos.js';
import animalRoutes from "./src/routes/animais.routes.js";
import adminRoutes from './src/routes/admin.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';
import pedidoAdocaoRoutes from './src/routes/adocoes.routes.js';
import doacaoRoutes from './src/routes/doacoes.routes.js';

// I'm skendyman
// find my comments

//CARALHO, VAI TOMAR NO CU TWO TIMES
//VC E ESSA PORRA DE ADAGA MALDITA QUE TEM A HITBOX DO REVÓLVER DO CHANCE
//VAI SE FUDER, COMO ESSA PORRA DE ATAQUE CONSEGUE ATÉ ATRAVESSAR PAREDE, DESGRAÇA?
//GOD, IM FUCKING TIRED OF YOU TWO TIMES

//  ██╗██╗  ██╗   ███╗   ██╗  ███████╗  ██████╗   ███████╗  ███████╗
// ███║██║  ██║   ████╗  ██║  ██╔════╝  ██╔══██╗  ██╔════╝  ██╔════╝
// ╚██║███████║   ██╔██╗ ██║  █████╗    ██████╔╝  █████╗    ███████╗
//  ██║╚════██║   ██║╚██╗██║  ██╔══╝    ██╔══██╗  ██╔══╝    ╚════██║
//  ██║     ██║   ██║ ╚████║  ███████╗  ██║  ██║  ██║       ███████║
//  ╚═╝     ╚═╝   ╚═╝  ╚═══╝  ╚══════╝  ╚═╝  ╚═╝  ╚═╝       ╚══════╝

//how it feels when your son ask to jerk off by himself for the first time 💔🥀
                                                                          
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
