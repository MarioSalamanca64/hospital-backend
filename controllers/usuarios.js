const Usuario = require('../models/usuario');
const { response } = require('express');
//libreria para incryptar contra se pone a qui por que se crea el ususario
//npm i bcryptjs
const bcrypt = require('bcryptjs')


const getUsuarios = async(req , res) => {
    //find() quiero todos los usuarios // filtra nombre emial role google
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    })
}

const crearUsuario = async (req , res = response) => {
    //toma estos datos del body 
    const {email , password , nombre} = req.body;
   

    try {

        
    //condicion si ya existe el correo
    const existeEmail = await Usuario.findOne({ email });
    if(existeEmail){
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya existe'
        })
    }



    //crea un  nuevo usuario
    const usuario = new Usuario( req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    //salt es el numero de saltos
    usuario.password = bcrypt.hashSync(password, salt);


    //guardar datos en la base de datos //aun que mandes mas datos si no esta en el modelo no le hara caso
    await usuario.save();

     //solo se puede poner una vez 
    res.json({
        ok: true,
        usuario
    });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado... revisar logs'
        })
    }



}



module.exports = {
    getUsuarios,
    crearUsuario,

}