import express from 'express'
const router = express.Router();
import { postUsuario, postLogin } from '../controllers/usuarioControllers.js';
import { postQuestionario } from "../controllers/questionarioControllers.js";

//"pai, o senhor não tá na nóia dnv não, né?"
// cala a boca mlk, os cara tão no teto querendo roubar minha makita
router.post('/usuario', postUsuario);

router.post('/login', postLogin);

router.post('/questionario', postQuestionario);

export default router;
