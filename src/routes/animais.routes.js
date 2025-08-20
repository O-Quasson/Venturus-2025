import express from 'express';
const router = express.Router();

let animais = [
   { id: 0, nome: "zezao", especie: "pidao", porte: "de armas", castrado: false, vacinado: false, descricao: "coitadinho da silva", createdAt: "2001-09-11", updatedAt: "2001-09-11"},
   { id: 1, nome: "Cachorro", especie: "Jacaré", porte: "Absolutista", castrado: false, vacinado: true, descricao: "comquest", createdAt: "400-09-09", updatedAt: "400-09-09"},
   { id: 2, nome: "c00ldogg", especie: "robloxian", porte: "gubby", castrado: false, vacinado: false, descricao: "é um chacorro bruh :/", createdAt: "2026-13-35", updatedAt: "2026-13-35"},
   { id: 3, nome: "Toykisser", especie: "white cat", porte: "não sabo", castrado: true, vacinado:true, descricao: "you like kissing toys don't you", createdAt:"2011-12-31", updatedAt: "2011-12-31"}
];

router.get('/animais', (req, res) => {
   if(!animais){
      res.status(500).json({"error": "Erro ao buscar animais"});
   }else{
      res.status(200).json({"data": animais, "total": animais.length});
   }
});

router.post('/animais', (req, req) => {
   const novoAnimal = {
      id: animais.length() + 1,
      nome: req.body.nome,
      especie: req.body.especies,
      porte: req.body.porte,
      //não existe parseBoolean
      //procurar como resolver isso
      castrado: req.body.castrado,
      vacinado: req.body.vacinado,
      descricao: req.body.descricao,
      adotado: req.body.adotado,
      createdAt: new Date(),
      updatedAt: createdAt
   }
   //escrever if/else para verificação (completar depois porque eu estou com preguiça agora)
   //if para informações faltando
   if(nome){
      res.status(400).json({"error": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
   }
   else{
      //erro interno
      //sla tbm porra kkkkkkkk
      if(email){
         res.status(500).json({"erro": "Erro interno ao cadastrar o animal."});
      }else{
         animais.push(novoAnimal);
         res.status(201).json({"id": novoAnimal.id,
                              "nome": novoAnimal.nome,
                              "especie": novoAnimal.especie,
                              "porte": novoAnimal.porte,
                              "castrado": novoAnimal.castrado,
                              "vacinado": novoAnimal.vacinado,
                              "descricao": novoAnimal.descricao,
                              "foto": "Não temos buffer ainda"});
         
      }
   } 
});

//isso daqui deveria ser para admin, mas fiz aqui pq funny haha lol
//sério, alguém me ajuda, eu não faço ideia do que eu tô fazendo
//MUSTAAAAAARRRDDDDDDD
router.get('/animais/:id', (req, res) => {
   const id = parseInt(req.params.id);
   const indice = animais.findIndex(animais => animais.id == id);

   if(indice==-1){
      res.status(404).json({"error": "Animal não encontrado"});
   }else{
      res.status(200).json({id: id,
         nome: animais[indice].nome,
         especie: animais[indice].especie,
         porte: animais[indice].porte,
         castrado: animais[indice].castrado,
         vacinado: animais[indice].vacinado,
         adotado: animais[indice].adotado,
         descricao: animais[indice].descricao,
         foto: "não temos imagem ainda",
         pedidos: "insira os ID's dos pedidos aqui"});
   }
})

//eu não sei se eu deveria colocar as outras rotas de admin aqui
//caralho, eu não faço a menor ideia do que eu to fazendo