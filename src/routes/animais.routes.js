import express from 'express';
const router = express.Router();
import { postAnimal, getAnimais } from "../controllers/animalControllers.js";
import multer from 'multer';

//configurações do multer
const upload = multer({ storage: multer.memoryStorage() });

router.post('/animais', upload.single('foto'), postAnimal);

router.get('/animais', getAnimais);

export default router;
