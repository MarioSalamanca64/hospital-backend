const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req,res,next) =>{

    //leer el TOKEN
    const token =  req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        });
    }
    //simepre usa try y catch en verificar el jwt
    try {
        //a qui el token es el que leemos del header
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        //poniendo informacion en la req pasa si tiene el token si paso por la validacion del token
        //en si saca el id del que hace la peticion
       req.uid = uid;

         //si todo sale bien 
         next();

    } catch ( error ) {
        return res.status(401).json({
            ok: false,
            msg:'Token no valido'
        });
    }

    console.log(token);

}

const validarADMIN_ROLE = async(req, res , next) => {
    //tenemos este id que biene de la parte de ariba 
    const uid = req.uid

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg:'Usuario no existe'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            })

        }
        //si comple con el rol y pasa se llama el next para que siga con la aplicacion 
        next();

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}
//para que pueda modificar su informacion el mismo ususario 
const validarADMIN_ROLE_o_MismoUsuario = async(req, res , next) => {
    //tenemos este id que biene de la parte de ariba 
    const uid = req.uid
    //tomamos el id de la url
    const id  = req.params.id

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg:'Usuario no existe'
            });
        }

        //y si tampoco conside el mismo id puede esitar la informacion mandada por la url
        if(usuarioDB.role === 'ADMIN_ROLE' && uid === id){

            //si comple con el rol y pasa se llama el next para que siga con la aplicacion 
            next();

        }else{

            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            })
            
        }

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}