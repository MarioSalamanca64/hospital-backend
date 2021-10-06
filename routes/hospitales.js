/*
    Hospitales
    /api/hospitales
*/ 

/*
Ruta: /api/usuarios
npm i express-validators
*/

const {Router} = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
        getHospitales,
        crearHospital,
        actualizarHospitales,
        borrarHospitales    
} = require('../controllers/hospitales')

const router = Router();

 router.get( '/', getHospitales);
//segunda comillas es midelware y el tersero son controladores
 router.post( '/', 
    [
     
    ],     
    crearHospital );
//actualizar usuario
 router.put('/:id', 
 [

], 
actualizarHospitales);

router.delete('/:id',
    borrarHospitales
);







module.exports = router;