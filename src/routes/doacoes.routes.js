import express from 'express';
const router = express.Router();
import postDoacao from '../controllers/doacaoControllers.js';

//do you hear the whistle?
// can you blow my whistle baby, whistle baby
// here we go, fiu fiu fiu fiu fiu


router.post('/Doacao', postDoacao);
