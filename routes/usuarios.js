/*
Ruta: /api/usuarios
npm i express-validators
*/

const {Router} = require('express');
const { check } = require('express-validator')
const {getUsuarios, crearUsuario,actualizarUsuario,borrarUsuario} = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT , validarADMIN_ROLE , validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

 router.get( '/',validarJWT , getUsuarios);
//segunda comillas es midelware y el tersero son controladores
 router.post( '/', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        //middlewares
        validarCampos,
    ],     
 crearUsuario );
//actualizar usuario
 router.put('/:id', 
 [
     validarJWT,
     //es para que no pueda editar si no es administrador pero si es el mismo ususario si 
     validarADMIN_ROLE_o_MismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
], 
actualizarUsuario);

router.delete('/:id',
    [validarJWT,validarADMIN_ROLE],
    borrarUsuario
);







module.exports = router;