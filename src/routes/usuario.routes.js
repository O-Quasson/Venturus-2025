import express from 'express'
const router = express.Router();
import { postUsuario, postLogin, patchUsuario, getUsuarioById } from '../controllers/usuarioControllers.js';
import { postQuestionario } from "../controllers/questionarioControllers.js";

router.get('/usuario/:id', getUsuarioById);

router.post('/usuario', postUsuario);

router.post('/login', postLogin);

router.post('/questionario', postQuestionario);

router.patch('/usuario/:id', patchUsuario);

export default router;
