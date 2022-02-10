/*
    Hospitales
   /api/medicos/
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos')

const router = Router();

 router.get( '/', getMedicos);
//segunda comillas es midelware y el tersero son controladores
 router.post( '/', 
    [
        validarJWT,
        check('nombre','El nombre del medico es nesesario').not().isEmpty(),
        check('hospital','El hospital od debe de ser valido').isMongoId(),
        validarCampos
    ],     
    crearMedico);
//actualizar usuario
 router.put('/:id', 
 [
    validarJWT,
    check('nombre','El nombre del medico es nesesario').not().isEmpty(),
    check('hospital','El hospital od debe de ser valido').isMongoId(),
    validarCampos
], 
actualizarMedico);

router.delete('/:id',
borrarMedico
);







module.exports = router;