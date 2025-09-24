import express from 'express';
const router = express.Router();
import postDoacao from '../controllers/doacaoControllers.js';

//do you hear the whistle?
// can you blow my whistle baby, whistle baby
// here we go, fiu fiu fiu fiu fiu

//guilherme esqueceu de apagar o comentário de cima
//you stupid nig-
//se ele esquecer de apagar esse tbm, tamo fudido ent 😎👍

router.post('/doacao', postDoacao);

export default router;