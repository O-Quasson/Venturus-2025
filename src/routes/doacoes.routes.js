import express from 'express';
const router = express.Router();
import postDoacao from '../controllers/doacaoControllers.js';

//do you hear the whistle?

router.post('/doacao', postDoacao);

export default router;