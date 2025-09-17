import express from 'express';
const router = express.Router();
import { postAnimal, getAnimais } from "../controllers/animalControllers.js";

router.post('/animais', postAnimal);

router.get('/animais', getAnimais);

export default router;
