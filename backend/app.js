const express = require('express');
const apiRouter = require('./server');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

//Configuración de la aplicación Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

apiRouter(app);

module.exports = app;