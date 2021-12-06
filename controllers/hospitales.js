const {response} = require('express');
const Hospital  = require('../models/hospital');

const  getHospitales = async(req,res= response) => {

    const hospitales = await Hospital.find()    
                                     //nombre de quien lo creo
                                     .populate('usuario','nombre email')


    res.json ({
        ok: true,
        hospitales
    })
}

const  crearHospital = async(req,res) => {
    
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try{        

     const hospitalDB = await hospital.save();

    res.json ({
        ok: true,
        hospital: hospitalDB
    });
    }catch(error){

        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })

    }

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