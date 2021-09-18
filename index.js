require('dotenv').config();

const express = require('express');
//npm i dotenv
const cors = require('cors')

const { dbConnection } = require('./database/config');
//Crear el servidor de express
const app = express();

//Configurar cors
app.use( cors() );


//base de datos
dbConnection();
console.log( process.env );

//Rutas
app.get( '/', (req , res) => {
    //urlcompleta para crear la data base y el ususario:
    //user creado por nosotros
    //user:mean_user
    //password:j7kfkfKKAbRmMWKQ



    res.status(400).json({
        ok: true,
        msg: 'Hola Mundo',
        msjmarte: 'el alfredo esta rico los cabesones lo amaremos'
    })

});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puesto ' + process.env.PORT );
} )