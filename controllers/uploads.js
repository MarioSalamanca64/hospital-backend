const {response} = require('express');


//validacion de la actualizacion de la img
const fileUpload = (req,res = response) => {

     const tipo = req.params.tipo;
     const id   = req.params.id;
   //Validar tipo
   const tiposValidos = ['hospitales','medicos','usuarios'];
   if(!tiposValidos.includes(tipo)){
       return res.status(40).json({
           ok: false,
           msg:'No es un medico, usuario u hospital (tipo)'
       })
   }
   //validar que exista el archivo
     if (!req.files || Object.keys(req.files).length === 0) {
         return res.status(400).json({
             ok:false,
             msg: 'No hay ningun archivo'
         });
       }
    //Procesar la imagen...
    

    res.json({
        ok: true,
        msg: 'fileUploaded'
    })
}

module.exports = {
    fileUpload
}
