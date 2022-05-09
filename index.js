require('dotenv').config();

//parte de ultimo
// const path = require('path');

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

//Directorio publico
app.use( express.static('public'))

//Rutas
app.use( '/api/usuarios', 
//toda peticion que pase po la url de ariba lo mandara al archivo rutas 
require('./routes/usuarios'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/uploads', require('./routes/uploads'));

//ultimo como manejar las rutas cualquiera fuera de las que tenemos por si queremos meter la app a aqui mismo en node 
// app.get('*',(req,res) => {
//     res.sendFile(path.resolve(__dirname,'public/index.html'));
// });



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puesto ' + process.env.PORT );
} )