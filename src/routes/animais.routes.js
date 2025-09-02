import express from 'express';
const router = express.Router();
import { postAnimal, getAnimais } from "../controllers/animalControllers.js";


router.post('/animais', postAnimal);

router.get('/animais', getAnimais);

//isso daqui deveria ser para admin, mas fiz aqui pq funny haha lol
//sério, alguém me ajuda, eu não faço ideia do que eu tô fazendo
//MUSTAAAAAARRRDDDDDDD

//eu não sei se eu deveria colocar as outras rotas de admin aqui
//caralho, eu não faço a menor ideia do que eu to fazendo???????

export default router;
