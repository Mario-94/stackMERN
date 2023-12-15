const mongoose = require('mongoose');
// De esta manera nos conectamos remotamente a mongoAtlas en caso de error nos lo mostrara por consola
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('se realizo la conexion exitosamente Mongo db atlas'))
    .catch((error) => console.log(error))