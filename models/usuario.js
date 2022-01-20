const { Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
    //esto ara que se grabe este modelo en la base de datos
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    },
});

//cambiar nombre al id
UsuarioSchema.method('toJSON', function(){
    //estoy estrallendo la version y el id //...object todo lo demas y quitando el password
   const { __v, _id,password, ...object } = this.toObject();
    //cambiar _id por uid
   object.uid = _id;
   return object;
})

//'Usuario' es el modelo de qui cada que alguna persona quiera grabar un ususario tiene que usar esete modelo
module.exports = model('Usuario', UsuarioSchema)