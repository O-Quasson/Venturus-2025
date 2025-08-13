import express from 'express';
const router = express.Router();

let animais = [
   { id: 0, nome: "cuzao", especie: "pidao", porte: "de armas", castrado: false, vacinado: false, descricao: "fudidinho da siva", created_at: "1945-"},
   { id: 1, nome: "Cachorro", especie: "Jacaré", porte: "Absolutista", castrado: false, vacinado: true, descricao: "comquest", created_at: "400 B.c"},
   { id: 2, nome: "c00ldogg", especie: "robloxian", porte: "pau de 90 metro-mol", castrado: false, vacinado: false, descricao: "é um chacorro bruh :/", created_at: "2026"},
   { id: 3, nome: "Toykisser", especie: "white cat", porte: "bem gay", castrado:"ele é gay, nn faz diferença", vacinado:true, descricao: "you like kissing boys don't you", created_at:"2011X"}
];

router.get('/animais', (req, req) => {
   res.send(animais);
});

router.post('/animais', (req, req) => {
   let id = animais.length() + 1;
   let nome = req.body.nome;
   let especie = req.body.especies;
   let porte = req.body.porte;
   //não existe parseB
   let castrado = parseBoolean(req.body.castrado);
   let vacinado = parseBoolean(req.body.vacinado);
   let adotado = parseBoolean(req.body.adotado);
});