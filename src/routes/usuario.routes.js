import express from 'express'
const router = express.Router();
import { postUsuario } from '../controllers/usuarioControllers.js';

router.post('/usuario', postUsuario);

// router.post('/questionario', postQuestionario);

export default router;
