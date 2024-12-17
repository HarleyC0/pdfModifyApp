const express = require('express')
const path = require('path')
const app = express()
const port = 3000;


// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))


// Leer datos de form

app.use(express.urlencoded({ extended: true }));

app.get('/status', (req, res) => {
    res.send({
        up: true
    });
});

app.post('/submit', (req, res) => {
    const {
        'srA': srA,
        'mrS': mrS,
        'name': name,
        'fechaEs': fechaEs,
        'fechaEn': fechaEn,
        'dir1': dir1,
        'dir2': dir2,
        'num': num,
        'email': email,
        'nameAgent': nameAgent,
        } = req.body;
    console.log(`nombre: ${name}, correo: ${email}`)
    res.send(`Datos recibidos: <br> Nombre: ${name} <br> Correo: ${email}`);
});

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});