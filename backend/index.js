const app = require('./app')


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto:${port}`);
    console.log('http://localhost:3000/')
});
