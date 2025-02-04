const express = require('express')
const path = require('path')
const app = express()
const port = 3000;

const modifyPdf = require('./Bienvenida')
const AcuerdoServicios = require('./AcuerdoServicios')


// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))


// Middleware para leer datos del formulario

app.use(express.urlencoded({ extended: true }));

app.get('/status', (req, res) => {
    res.send({
        up: true
    });
});

app.post('/submit', async (req, res) => {
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
    console.log(`Datos recibidos: Nombre ${name}, correo: ${email}`)
    
    try {
        await modifyPdf(`${srA || mrS}`, name, fechaEs)
        await AcuerdoServicios(fechaEs, fechaEn, name)
        res.send(`PDF generado para: ${name}. Revisar en Output Bienvanida.pdf`)
        // Meter aqui el link de "Descargar PDF"
    } catch (error) {
        console.log("Error generando el PDF", error)
        res.status(500).send("Ocurrio un error generando el pdf");
    }
});

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});