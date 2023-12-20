const express = require('express');
const cors = require('cors');
const app = express();
// settings
// se puede agregar el puerto de la siguiente manera
app.set('port', process.env.PORT || 5000)
// middlewares
app.use(cors())
app.use(express.json());

// routes
app.use('/api/users', require('./routes/users'))
// con esto estoy probando que esto este correcto, es decir como degino multiples rutas y como se interpretan en el otro achivo
app.use('/api/users/all', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))
module.exports = app;