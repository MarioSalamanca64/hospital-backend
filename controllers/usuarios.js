const Usuario = require('../models/usuario');
const { response } = require('express');
//libreria para incryptar contra se pone a qui por que se crea el ususario
//npm i bcryptjs
const bcrypt = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')


const getUsuarios = async(req , res) => {
    //paginacion de 5 
    //si no trae nombre esntonces que utilice 0 
    const desde = Number(req.query.desde) || 0;
    //console.log(desde);
    

    //find() quiero todos los usuarios // filtra nombre emial role google
    // const usuarios = await Usuario.find({}, 
    //                                         'nombre email role google')
    //                                         //que ignore todo aparter de en estecaso del 0 al final y si fuera el 5 del 5 al final
    //                                         .skip( desde )
    //                                         //solo tendra un limite de cuantas mostrara 
    //                                         .limit( 5 );
    // //el total de todos los registros
    // const total = await Usuario.count();  

    //un coleccion de promesas para que la promesa si interfiera con la otra y sean las dos al mismo tiempo se usa esta funcion 
    const [ usuarios, total ] = await Promise.all([

        Usuario
                       .find({},'nombre email role google img')
                       //que ignore todo aparter de en estecaso del 0 al final y si fuera el 5 del 5 al final
                       .skip( desde )
                       //solo tendra un limite de cuantas mostrara 
                       .limit( 5 ),
        //total de usuarios               
        Usuario.countDocuments()
    ]
    )
                                            
    res.json({
        ok: true,
        usuarios,
        total
        //mostrar el id de el usuario que mado la peticion del json
        //uid: req.uid
    })
}

const crearUsuario = async (req , res = response) => {
    //toma estos datos del body 
    const {email , password } = req.body;
   

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

    //crear un jwt 
     const token = await generarJWT( usuario.id );
    
     //solo se puede poner una vez 
    res.json({
        ok: true,
        usuario,
        token
    });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado... revisar logs'
        })
    }

}

const actualizarUsuario =  async(req, res = response) => {

    //todo: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    // const {nombre, role ,email} = req.body;

    try {
        // //si existe el usuario finById moongoose
        const usuarioDB = await Usuario.findById(uid);
        // //si no existe el usuario
         if(!usuarioDB){
             return res.status(404).json({
                 ok: false,
                 msg:'No existe un usuario por ese id'
             });
         }


        // lo hacemos otra vez para que no meta esos campos
        //elementos que no se tocaran a la hora de actualizar el usuario
        //Actualizaciones
        //desestruturamos los objetos que no usaremos
        const {password,google,email, ...campos} = req.body;
      

        if( usuarioDB.email !== email ){
            //si existe el mismo email
            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                return res.status(400).json({
                    ok:false,
                    msg:'ya existe un usuario con ese email'
                });
            }
        }

        if(!usuarioDB.google){
            campos.email = email;
        }else if(usuarioDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario del google no puede cambiar su correo'
            });
        }

        // campos.email = email;
        // // lo hacemos otra vez para que no meta esos campos
        // //elementos que no se tocaran a la hora de actualizar el usuario
        // // delete campos.password;
        // // delete campos.google;
        //indicar que siempre regrese el nuevo 
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos,{new: true})


        res.json({
            ok: true,
            usuario:usuarioActualizado
        });   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }

}

const borrarUsuario = async(req, res = response) => {
//nesesitamos el id de la persona que biene en 
const uid = req.params.id;

const usuarioDB = await Usuario.findById(uid);
//si no existe el usuario
if(!usuarioDB){
    return res.status(404).json({
        ok: false,
        msg:'No existe un usuario por ese id'
    })
}
await Usuario.findByIdAndDelete(uid);

try {
    res.json({
        ok:true,
        msg:'No existe un ususario por ese id'
    })
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
    })
}

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}