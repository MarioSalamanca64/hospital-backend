const {response} = require('express')

const Medico = require('../models/medicos')

const  getMedicos = async(req,res= response) => {

    const medicos = await Medico.find()
                                //trae los datos del usuario que lo creo y del hospital
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');
     res.json ({
         ok: true,
         medicos
     })
}

const  getMedicoById = async(req,res= response) => {

    const id  = req.params.id;

    try { 
            const medico = await Medico.findById(id)
                                        //trae los datos del usuario que lo creo y del hospital
                                        .populate('usuario','nombre img')
                                        .populate('hospital','nombre img');
             res.json ({
                 ok: true,
                 medico
             })
    } catch (error) {
        console.log(error)
        res.json ({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
    
}

const  crearMedico = async(req,res) => {

    const uid = req.uid;
    const medico = new Medico({
        //id del usuario 
        usuario: uid,
        //respuesta del  body 
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json ({
            ok: true,
            msg: 'Se creo el medico',medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
    }
}

const  actualizarMedico = async(req,res) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if(!medico){
           return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado por id'
            });
        }
        //solo un campo
        //medico.nombre = req.body.nombre;
        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        }

        const medicolActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico, /*regrese el ultimo documento actiualizado*/{new:true});

        
        res.json ({
            ok: true,
            msg: 'actualizarMedico',
            medico: medicolActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const  borrarMedico = async(req,res) => {
    const id  = req.params.id;
 

    try {

        const medico = await Medico.findById(id);

        if(!medico){
           return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado por id'
            });
        }
        
        await Medico.findByIdAndDelete(id);

        
        res.json ({
            ok: true,
            msg: 'Medico borrado',
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}