import express from "express";
const router = express.Router();

import { getAnimalById, patchAnimal, delAnimal } from "../controllers/animalControllers.js";

//todas as rotas de admin tem que vir aqui pq haha, funny

router.get('/animais/:id', getAnimalById);

router.patch('/animais/:id', patchAnimal);

router.delete('/animais/:id', delAnimal);

export default router;