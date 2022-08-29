import { Router } from "express";
import { userDelete, userGet, userPatch, userPost, userPut } from "../controllers/usuarios.js";
import { emailValidator, idValidator, rolValidator } from "../helpers/dbValidators.js";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarJWT.js";
import { esAdminRole, tieneRole } from "../middlewares/validarRoles.js";

export const routerUsuarios = Router();

routerUsuarios.get('/', userGet)

routerUsuarios.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idValidator),
    check('rol').custom( rolValidator ),
    validarCampos
], userPut)

routerUsuarios.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    check('correo').custom(emailValidator),

    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( rolValidator ),
    validarCampos
], userPost)

routerUsuarios.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE','USER_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idValidator),
    validarCampos
], userDelete)

routerUsuarios.patch('/', userPatch)

