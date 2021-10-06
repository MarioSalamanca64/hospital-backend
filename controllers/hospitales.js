const {response} = require('express')

const  getHospitales = (req,res= response) => {
    res.json ({
        ok: true,
        msg: 'getHospiatales'
    })
}

const  crearHospital = (req,res) => {
    res.json ({
        ok: true,
        msg: 'crearHospiatales'
    })
}

const  actualizarHospitales = (req,res) => {
    res.json ({
        ok: true,
        msg: 'actualizarHospiatales'
    })
}

const  borrarHospitales = (req,res) => {
    res.json ({
        ok: true,
        msg: 'borrarHospiatales'
    })
}





module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospitales,
    borrarHospitales
}