const { response } = require('express') 

const getTodo = (req,res = response) => {
    //busqueda es igual al parametro que le estas mandando
    const busqueda = req.params.busqueda;   

    res.json ({
        ok:true,
        msg: 'getTodo',
        busqueda
    })

}



module.exports = {
    getTodo
}