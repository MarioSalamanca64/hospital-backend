//acceder alos archivos de siestas carpetas
const fs = require('fs');

const Usuario  = require('../models/usuario');
const Medicos  = require('../models/medicos');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {

    if(fs.existsSync(path)){
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
    
}

const actualizarImagen = async (tipo, id,  nombreArchivo) => {
   let pathViejo = '';

    switch ( tipo ) {
        case 'medicos':
            const medico = await Medicos.findById(id);
            //verificar si el medico existe por _id
            if( !medico){
                console.log('No es un medico por id');
                return false;
            }
            //borrar la imagen y dejar la nueva
            pathViejo = `./uploads/medicos/${ medico.img }`;

            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            //guardemos el medico
            await medico.save();
            return true;

        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            //verificar si el medico existe por _id
            if( !hospital){
                console.log('No es un medico por id');
                return false;
            }
            //borrar la imagen y dejar la nueva
             pathViejo = `./uploads/hospitales/${ hospital.img }`;

            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            //guardemos el medico
            await hospital.save();
            return true;
            
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            //verificar si el medico existe por _id
            if( !usuario){
                console.log('No es un medico por id');
                return false;
            }
            //borrar la imagen y dejar la nueva
            pathViejo3 = `./uploads/usuario/${ usuario.img }`;

            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            //guardemos el medico
            await usuario.save();
            return true;
            
        break;
    }
 
}



module.exports = {
    actualizarImagen
}