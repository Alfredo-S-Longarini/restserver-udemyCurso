import { request, response } from "express";
import jwt from 'jsonwebtoken';
import Usuario from "../models/usuario.js";


export const validarJWT = async(req=request, res=response, next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token'
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRET_KEY);

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msj:'El usuario no existe'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msj:'El usuario no esta activo'
            })
        }

        req.usuario = usuario;
     
        next();
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg:'El token no es válido'
        });
        
    }
}