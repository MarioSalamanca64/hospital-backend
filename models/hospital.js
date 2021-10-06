const { Schema, model} = require('mongoose');


const HospitalSchema = Schema({
    //esto ara que se grabe este modelo en la base de datos
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    usuario: {
        //ten una referencia de otro archivo
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
},//cambiar nombres
{collection:'hospitales'});

//cambiar nombre al id
HospitalSchema.method('toJSON', function(){
    //estoy estrallendo la version y el id //...object todo lo demas y quitando el password
   const { __v, ...object } = this.toObject();
    //cambiar _id por uid
   object.id = _id;
   return object;
})

//'Usuario' es el modelo de qui cada que alguna persona quiera grabar un ususario tiene que usar esete modelo
module.exports = model('Usuario', HospitalSchema)