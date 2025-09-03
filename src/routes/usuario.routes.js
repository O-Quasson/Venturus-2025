import express from 'express'
const router = express.Router();
import { postUsuario, postQuestionario } from '../controllers/usuarioControllers';
//do you understand mechanical hands
//are the ruler of everything?
//ruler of everything
//im the ruler [régua30cm.png]
router.post('/usuario', postUsuario);

router.post('/questionario', postQuestionario);
