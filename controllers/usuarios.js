import { response } from "express"; //Para que funcione res. y sea mas comodo.
import Usuario from '../models/usuario.js'

import bcryptjs from "bcryptjs"

export const userGet = async(req, res = response) => { 

    const {limite=5, desde=0} = req.query
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        await Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({total, usuarios});
}

export const userPut = async(req, res) => { 

    const {id}= req.params
    const {_id, password, google, correo, ...resto} = req.body

    if(password){

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);
}

export const userPost = async(req, res = response) => { 

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña.
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en base de datos.
    await usuario.save();

    res.json({
        usuario
    });
}


export const userDelete = async(req, res) => { 

    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})

    res.json(usuario);
}

export const userPatch = (req, res) => { 
    res.json({
        msg:'patch API - controller'
    });
}