const express = require('express');
const path = require('path');
const index = express();

const port = process.env.PORT || 3000; // De forma local 3000, en Vercel asignará un puerto

const modifyPdf = require('./Bienvenida');
const AcuerdoServicios = require('./AcuerdoServicios');

// Ruta para servir el index.html en la página principal
index.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware para servir archivos estáticos (permite encontrar y servir styles.css)
index.use(express.static(path.join(process.cwd(), 'public')));

index.get('/status', (req, res) => {
    res.send({ up: true });
});

// Middleware para leer datos del formulario
index.use(express.urlencoded({ extended: true }));

index.post('/submit', async (req, res) => {
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

    console.log(`Datos recibidos: Nombre ${name}, correo: ${email}`);

    try {
        // Generar los PDFs en memoria
        const bienvenidaPdf = await modifyPdf(`${srA || mrS}`, name, fechaEs);
        const acuerdoPdf = await AcuerdoServicios(fechaEs, fechaEn, name);

        // Enviar los PDFs directamente como respuesta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="Bienvenida.pdf"`);

        // Si quieres enviar el PDF de Bienvenida
        res.send(bienvenidaPdf);

        // Si deseas enviar el Acuerdo de Servicios como PDF en lugar de respuesta directa, puedes hacerlo aquí también:
        // res.send(acuerdoPdf); 
    } catch (error) {
        console.log("Error generando el PDF", error);
        res.status(500).send("Ocurrió un error generando el PDF");
    }
});

index.listen(port, () => {
    console.log(`Running server on port ${port}`);
});