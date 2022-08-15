import { Router } from "express";
import { userDelete, userGet, userPatch, userPost, userPut } from "../controllers/usuarios.js";

export const router = Router();

router.get('/', userGet)

router.put('/:id', userPut)

router.post('/', userPost)

router.delete('/', userDelete)

router.patch('/', userPatch)

