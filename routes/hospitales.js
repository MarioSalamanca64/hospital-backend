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
        validarJWT,
        check('nombre','El nombre del hospital es nesesario').not().isEmpty(),
        //validacion de id de mongo
        check('hospital','El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],     
    crearHospital );
//actualizar usuario
 router.put('/:id', 
 [  
    validarJWT,
    check('nombre','El nombre del hospital es nesesario').not().isEmpty(),
    validarCampos
], 
actualizarHospitales);

router.delete('/:id',
    borrarHospitales
);


module.exports = router;