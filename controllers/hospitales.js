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

const  actualizarHospitales = async(req,res) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital){
           return res.status(404).json({
                ok:true,
                msg: 'Hospiatal no encontrado por id'
            });
        }
        //solo un campo
        //hospital.nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario: uid,
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital, /*regrese el ultimo documento actiualizado*/{new:true});

        
        res.json ({
            ok: true,
            msg: 'actualizarHospiatales',
            hospiatal: hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}

const  borrarHospitales = async(req,res = response) => {

    const id  = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital){
           return res.status(404).json({
                ok:true,
                msg: 'Hospiatal no encontrado por id'
            });
        }
        
        await Hospital.findByIdAndDelete(id)


        
        res.json ({
            ok: true,
            msg:'hospital eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}





module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospitales,
    borrarHospitales
}