const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Configuración de la aplicación Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Ruta para manejar la creación de nuevos usuarios
app.post('/api/users', (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const phone = req.body.phone;

    // Validación de datos del usuario
    if (!name || !id || !phone) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Carga de los usuarios existentes
    let users = [];
    try {
        users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json', 'utf8'));
    } catch (error) { }

    // Comprobación de que no exista ya un usuario con el mismo ID
    const existingUser = users.find((user) => user.id === id);
    if (existingUser) {
        return res.status(409).json({ error: 'Ya existe un usuario con este ID' });
    }

    // Agregado del nuevo usuario a la lista
    users.push({ name, id, phone });
    fs.writeFileSync(__dirname + '/data/users.json', JSON.stringify(users));

    res.json({ success: true });
});

// Ruta para recuperar la lista de usuarios
app.get('/api/users', (req, res) => {
    let users = [];
    try {
        users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json', 'utf8'));
    } catch (error) { }

    res.json(users);
});

// Inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


