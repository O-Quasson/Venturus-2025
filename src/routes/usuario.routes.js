import express from 'express'
const router = express.Router();
import { postUsuario, postLogin } from '../controllers/usuarioControllers.js';
import { postQuestionario } from "../controllers/questionarioControllers.js";

router.post('/usuario', postUsuario);

router.post('/login', postLogin);

router.post('/questionario', postQuestionario);

export default router;
