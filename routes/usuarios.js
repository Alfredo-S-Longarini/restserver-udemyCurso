import { Router } from "express";
import { userDelete, userGet, userPatch, userPost, userPut } from "../controllers/usuarios.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { emailValidator, idValidator, rolValidator } from "../helpers/dbValidators.js";

export const router = Router();

router.get('/', userGet)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idValidator),
    check('rol').custom( rolValidator ),
    validarCampos
], userPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    check('correo').custom(emailValidator),

    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( rolValidator ),
    validarCampos
], userPost)

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idValidator),
    validarCampos
], userDelete)

router.patch('/', userPatch)

