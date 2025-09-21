import express from "express";
const router = express.Router();

import { patchUsuario, getUsuarioById } from "../controllers/usuarioControllers.js"
import { getAnimalById, patchAnimal, delAnimal, getAnimaisAdmin } from "../controllers/animalControllers.js";

//todas as rotas de admin tem que vir aqui pq haha, funny

router.get('/admin/animais/', getAnimaisAdmin);

router.get('/admin/animais/:id', getAnimalById);

router.patch('/admin/animais/:id', patchAnimal);

router.delete('/admin/animais/:id', delAnimal);

//---------------------------------------

router.get('/admin/usuario/:id', getUsuarioById);

router.patch('/admin/usuario/:id', patchUsuario);





export default router;