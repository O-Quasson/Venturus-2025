import express from 'express'
const router = express.Router();
import { postUsuario } from '../controllers/usuarioControllers.js';
//do you understand mechanical hands
//are the ruler of everything?
//ruler of everything
//im the ruler [régua30cm.png]
//The guy above is crazy
router.post('/usuario', postUsuario);

// router.post('/questionario', postQuestionario);

export default router;
