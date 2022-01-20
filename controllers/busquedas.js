const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital= require('../models/hospital');


const getTodo = async(req,res = response) => {
    //busqueda es igual al parametro que le estas mandando
    const busqueda = req.params.busqueda ;  
    //exprecion regular 
    const regex = new RegExp(busqueda, 'i');
    //tarda mas 
    // const usuario    =  await Usuario.find({nombre: regex})
    // const medicos    =  await Medico.find({nombre: regex})
    // const hospitales =  await Hospital.find({nombre: regex})
    //de esta forma tarda menos
    const [usuario,medicos,hospitales] = await Promise.all([
        await Usuario.find({nombre: regex}),
        await Medico.find({nombre: regex}),
        await Hospital.find({nombre: regex}),
        
    ])
    

    res.json ({
        ok:true,
        usuario,
        medicos,
        hospitales
    })

}

const getDocumentosColeccion = async(req,res = response) => {
    //busqueda es igual al parametro que le estas mandando
    const tabla = req.params.tabla ;  
    const busqueda = req.params.busqueda;  
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    //exprecion regular 

    switch (tabla) {
        case 'medicos':  
           data = await Medico.find({nombre: regex})
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                                      .populate('usuario','nombre img');
        break

        case 'usuarios':
            data = await Usuario.find({nombre: regex})
                                      
        break;

        default:
        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
        })

        
    }
    //si encuentra una de las tres opciones lo manda como verdadero
    res.json({
        ok: true,
        resultado: data
    })

}



module.exports = {
    getTodo,
    getDocumentosColeccion
}