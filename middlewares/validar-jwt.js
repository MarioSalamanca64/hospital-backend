const jwt = require('jsonwebtoken')

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


module.exports = {
    validarJWT
}