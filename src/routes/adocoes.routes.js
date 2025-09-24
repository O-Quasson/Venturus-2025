import express from 'express';
const router = express.Router();
import { postAdocoes } from '../controllers/pedidoAdocaoControllers.js';

//1 única rota lmaoooooooooooooooooooooo
router.post('/adocoes', postAdocoes);

export default router;