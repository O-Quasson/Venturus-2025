import express from "express";
const router = express.Router();
import multer from 'multer';
import autenticar from "../middleware/AdminAutenticator.js"

import { patchUsuario, getUsuarioById } from "../controllers/usuarioControllers.js"
import { getAnimalById, patchAnimal, delAnimal, getAnimaisAdmin } from "../controllers/animalControllers.js";

//xiu he huan piao piao
//bei fan wuan huan xi hao
//yei pi
//hi muei
//huan mao
const upload = multer({ storage: multer.memoryStorage() });

//todas as rotas de admin tem que vir aqui pq haha, funny

router.get('/admin/animais/', autenticar, getAnimaisAdmin);

router.get('/admin/animais/:id', autenticar, getAnimalById);

router.patch('/admin/animais/:id', autenticar, upload.single('foto'), patchAnimal);

router.delete('/admin/animais/:id', autenticar, delAnimal);

//---------------------------------------
//divisória épica
//pra nada, só tem essas rotas de admin mesmo





export default router;