//next es si continua con el sigiente paso 
const{ response } = require('express');
const {validationResult} = require('express-validator')


const validarCampos = (req, res = response, next) => {
 
     //express-validators //todos los errores que pasaron por la ruta lo cacharemos aqui
     const errores = validationResult(req); 

     if( !errores.isEmpty() ){
         return res.status(400).json({
             ok:false,
             errors: errores.mapped()
         })
     }

     next();

}

module.exports = {
    validarCampos
}