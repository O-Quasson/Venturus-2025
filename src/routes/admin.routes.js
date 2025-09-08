import express from "express";
const router = express.Router();

import { getAnimalById, patchAnimal, delAnimal } from "../controllers/animalControllers.js";

//todas as rotas de admin tem que vir aqui pq haha, funny

router.get('/admin/animais/', getAnimalById);

router.get('/admin/animais/:id', getAnimalById);

router.patch('/admin/animais/:id', patchAnimal);

router.delete('/admin/animais/:id', delAnimal);

export default router;