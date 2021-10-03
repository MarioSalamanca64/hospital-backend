//npm i jsonwebtoken
const jwt = require('jsonwebtoken')


const generarJWT = (uid) => { 
    //trasformar esto en una promesa asincrono
    return new Promise((resolve,reject) => {

        //crear json
        const payload = {
            uid,
        };
        
        //firmar token la segunda parte es la palabra secreta TERCERA parte es la duracion del token
        jwt.sign( payload, process.env.JWT_SECRET,{
            expiresIn: '12h'
        }, (err, token) => {
                
            if( err ){
                console.log(err);
                reject('No se pudo geneerar el JWT')
            }else{
                //si no hay nungun error
                resolve(token)

            }
    
        });
    });
}


module.exports = {
    generarJWT,
}