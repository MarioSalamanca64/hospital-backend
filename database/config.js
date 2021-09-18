const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
            //await espara a que todo esto pase
             await mongoose.connect(process.env.BaseDatos_CNN);

            console.log('DB Online');
        
    } catch (error) {
        console.log(error)
            throw new Error('Error a la hora de inicar la DB VER logs')
    }



}

module.exports = {
    dbConnection
}