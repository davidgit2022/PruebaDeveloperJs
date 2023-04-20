const express = require('express');
const usersServices = require('../services/usersServices')
const router = express.Router();


// Ruta para manejar la creación de nuevos usuarios
router.post('/', async (req, res, next) => {
    try {
        const createUser = await usersServices.createUser(req, res);
        return createUser;
    } catch (error) {
        next(error)
    }
});

// Ruta para recuperar la lista de usuarios
router.get('/', async (req, res) => {
    try {
        const users = await usersServices.getAllUsers(req, res, next);
        res.json(users);
    } catch (error) {
        next(error)
    }
});

module.exports = router

