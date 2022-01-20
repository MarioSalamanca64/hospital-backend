const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getTodo,getDocumentosColeccion } =  require('../controllers/busquedas')



const router = Router();

router.get('/:busqueda', validarJWT ,getTodo);
//otro tipo de buscador
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion)




module.exports = router;