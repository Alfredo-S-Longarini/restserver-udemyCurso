import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

export const rolValidator = (async(rol='')=>{
    const existeRol =await Role.findOne({rol});

    if(!existeRol){
        throw new Error(`El rol ${rol} no esta está registrado en la base de datos`)
    }
})

export const emailValidator = (async(correo='')=>{
    //Verificar si el correo existe.
    const existeEmail = await Usuario.findOne({correo})

    if (existeEmail){
       throw new Error(`El correo: ${correo}, ya está registrado`)
    } 
})

export const idValidator = (async(id)=>{
    //Verificar si el correo existe.
    const existeId = await Usuario.findById(id)

    if (!existeId){
       throw new Error(`El id: ${id}, no existe`)
    } 
})