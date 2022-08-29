import { request, response } from "express";


export const esAdminRole = (req=request, res=response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msj:'Se quiere validar el rol sin validar el token!'
        });
    }

    const {rol, nombre}=req.usuario;

    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador`
        });
    }
    
    next();
}

export const tieneRole = (...roles) =>{

    return (req=request, res=response, next)=>{

        if(!req.usuario){
            return res.status(500).json({
                msj:'Se quiere validar el rol sin validar el token!'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msj:`El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}