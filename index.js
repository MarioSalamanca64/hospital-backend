require('dotenv').config();

const express = require('express');
//npm i dotenv
const cors = require('cors')

const { dbConnection } = require('./database/config');
//Crear el servidor de express
const app = express();

//Configurar cors las url que queremos que se conecten a nuestra api
app.use( cors() );

//lecturas y parseo del body los datos del usuario para porder guardarlo
app.use(express.json());



//base de datos
dbConnection();

//     //urlcompleta para crear la data base y el ususario:
//     //user creado por nosotros
//     //user:mean_user
//     //password:j7kfkfKKAbRmMWKQ

//Rutas
app.use( '/api/usuarios', 
//toda peticion que pase po la url de ariba lo mandara al archivo rutas 
require('./routes/usuarios'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/login',require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puesto ' + process.env.PORT );
} )