import { request, response } from "express";
import Usuario from '../models/usuario.js'
import bcryptjs from "bcryptjs"
import { generarJWT } from "../helpers/generarJWT.js";
import { googleVerify } from "../helpers/googleVerify.js";

export const login = async(req, res= response)=>{

    const {correo, password} = req.body

    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/password no son correctos - correo'
            })
        }

        //Si el usuario sigue activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario/password no son correctos - estado: false'
            })
        };

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/password no son correctos - password'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json("Algo salió mal")
    }

}


export const googleSignIn = async(req, res=response) =>{

    const { id_token }=req.body;

    try {

        // const {nombre, img, correo}= await googleVerify(id_token);

        const userGoogle= await googleVerify(id_token);

        const {nombre, img, correo} = userGoogle;

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre,
                correo,
                password: 'password',
                img,
                rol: 'USER_ROLE',
                google: true,
            };

            usuario = new Usuario(data);

            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador, Usuario bloqueado'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: 'No se pudo verificar el token'
        })

        console.log(error);
        
    }


}