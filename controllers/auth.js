const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req, res = response) => {
    //sacara los elementos del body 
    const {email, password} = req.body;
    
    try {


 
        //si existe el email verificar email
        const usuarioDB = await Usuario.findOne({ email });
        //si no existe el email detiene todo 
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg:'el email no fue encontrado'
            })
        }

        //verificar password comparar password compareSync()
        const validPassword = bcrypt.compareSync( password,usuarioDB.password)
            //si no es un password valido
            if(!validPassword){
                return res.status(400).json({
                    ok: false,
                    msg: 'Contraseña no es valida'
                });
            }
        //generar los token - JWT await es por que es una promesa ya que lo trasformamos en helpers
        const token = await generarJWT( usuarioDB.id );
        res.json({
            ok:true,
            token
        })
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
}
const googleSingnIn = async(req,res = response) => {

    const googleToken = req.body.token;

    try {

      const {name,email,picture} = await googleVerify(googleToken);

        res.json({
            ok: true,
            msg: 'Google Signin',
            name,email,picture
        });
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
            
        });
    }


}


module.exports = {
    login,
    googleSingnIn
}