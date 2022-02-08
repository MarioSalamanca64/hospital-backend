/*
Path: '/api/login'
*/ 

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingnIn,renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],
login
);

router.post('/google',
[
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
],
googleSingnIn
)
//actualizar Token
router.get('/renew',

    validarJWT,
    renewToken
)







module.exports = router; 