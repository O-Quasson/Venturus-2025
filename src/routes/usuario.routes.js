import express from 'express'
const router = express.Router();
import { postUsuario, postQuestionario } from '../controllers/usuarioControllers';

router.post('/usuario', postUsuario);

router.post('/questionario', postQuestionario);
