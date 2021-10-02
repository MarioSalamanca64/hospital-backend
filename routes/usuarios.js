/*
Ruta: /api/usuarios
npm i express-validators
*/

const {Router} = require('express');
const { check } = require('express-validator')
const {getUsuarios, crearUsuario,actualizarUsuario,borrarUsuario} = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

 router.get( '/', getUsuarios);
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
 router.put('/:id', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('email','El role es obligatorio').isEmail(),
    validarCampos
], actualizarUsuario );

router.delete('/:id',
    borrarUsuario
);







module.exports = router;