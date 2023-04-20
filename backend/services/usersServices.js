// * Obtener los datos del json
const data = require('../db.json');


const createUser = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async (req, res) => {
    let users = [];
    try {
        users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json', 'utf8'));
    } catch (error) { }

    res.json(users);
}

module.exports = {
    home,
    createUser,
    getAllUsers,
}