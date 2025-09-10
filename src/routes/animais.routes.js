import express from 'express';
const router = express.Router();
import { postAnimal, getAnimais } from "../controllers/animalControllers.js";

//pra que tanto código
//se na vida nada é programado
//e os melhores momentos vividos
//não têm lógica?

//sla bro, só faz o bagulho aí e para de falar sozinho

//nuh uh

//what the fuck do you mean nuh uh?

//nuh uh

router.post('/animais', postAnimal);

router.get('/animais', getAnimais);

export default router;
