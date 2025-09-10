import express from 'express';
const router = express.Router();
import { postAdocoes } from '../controllers/pedidoAdocaoControllers.js';

router.post('/adocoes', postAdocoes);

export default router;