/*
Ruta: /api/usuarios
npm i express-validators
*/

const {Router} = require('express');
const { check } = require('express-validator')
const {getUsuarios, crearUsuario,actualizarUsuario,borrarUsuario} = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

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
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
   // check('role', 'El role es obligatorio').isEmail(),
    validarCampos,
], 
actualizarUsuario);

router.delete('/:id',
    validarJWT,
    borrarUsuario
);







module.exports = router;