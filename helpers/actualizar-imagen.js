//acceder alos archivos de siestas carpetas
const fs = require('fs');

const Usuario  = require('../models/usuario');
const Medicos  = require('../models/medicos');
const Hospital = require('../models/hospital');


const actualizarImagen = async (tipo, id,  nombreArchivo) => {
   
    switch ( tipo ) {
        case 'medicos':
            const medico = await Medicos.findById(id);
            //verificar si el medico existe por _id
            if( !medico){
                console.log('No es un medico por id');
                return false;
            }
            //borrar la imagen y dejar la nueva
            const pathViejo = `./uploads/medicos/${ medico.img }`;

            if(fs.existsSync(pathViejo)){
                // borrar la imagen anterior
                fs.unlinkSync(pathViejo)
            }

            medico.img = nombreArchivo;
            //guardemos el medico
            await medico.save();
            return true;

        break;

        case 'hospitales':
            
        break;

        case 'usuarios':
            
        break;
    }
 
}



module.exports = {
    actualizarImagen
}