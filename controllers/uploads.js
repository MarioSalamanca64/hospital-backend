const {response} = require('express');
const { v4: uuidv4 } = require('uuid')


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
    //nombre imagen es la misma que mande posman img 
    const file = req.files.imagen;
    //cortar para que solo sea .jpg .png etc
    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]
    //Validar extension
    const extensionesValidas = ['png','jpg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es un formato permitido'
        });
    }
    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    //Path ruta para guardar la img
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    // mover la img 
    file.mv(path , (err) => {
    if (err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg:'Error al mover la imagen'
        });
    }

    res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo
    })
  });
    


  
}

module.exports = {
    fileUpload
}
