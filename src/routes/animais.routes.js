import express from 'express';
const router = express.Router();
import { postAnimal } from "../controllers/animalControllers.js";

router.get('/animais', getAnimais);

router.post('/animais', postAnimal);

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
//caralho, eu não faço a menor ideia do que eu to fazendo???????
