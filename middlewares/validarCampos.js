import { validationResult } from "express-validator/src/validation-result.js";

export const validarCampos= (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next();
}