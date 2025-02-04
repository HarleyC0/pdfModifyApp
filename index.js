const express = require('express')
const path = require('path')
const index = express()

const port = process.env.PORT || 3000; // de forma local 3000, en vercel asignara un puerto

const modifyPdf = require('./Bienvenida')
const AcuerdoServicios = require('./AcuerdoServicios')


// Middleware para servir archivos estáticos
index.use(express.static(path.join(__dirname, 'public')))


// Middleware para leer datos del formulario

index.use(express.urlencoded({ extended: true }));

index.get('/status', (req, res) => {
    res.send({
        up: true
    });
});

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
    console.log(`Datos recibidos: Nombre ${name}, correo: ${email}`)
    
    try {
        await modifyPdf(`${srA || mrS}`, name, fechaEs)
        await AcuerdoServicios(fechaEs, fechaEn, name)
        // Meter aqui el link de "Descargar PDF"
        const cleanName = name.replace(/\s+/g, '');
        res.send(`
            <h2>PDF generado para: ${cleanName}.</h2>
            <p><a href=/download?file=Bienvenida${cleanName}.pdf>Descargar Bienvenida ${name}</a></p>
            <p><a href=/download?file=CertificacionDeVerdad${cleanName}.pdf>Descargar CertificacionDeVerdad ${name}</a></p>
            <p><a href=/download?file=DeclaracionyCertificacion${cleanName}.pdf>Descargar DeclaracionyCertificacion ${name}</a></p>
            <p><a href=/download?file=AcuerdosDeServicio${cleanName}.pdf>Descargar AcuerdosDeServicio ${name}</a></p>
            <p><a href=/download?file=EsquemaPago${cleanName}.pdf>Descargar EsquemaPago ${name}</a></p>
            <p><a href=/download?file=Pagare${cleanName}.pdf>Descargar Pagare ${name}</a></p>
            <p><a href=/download?file=RenunciaResponsabilidad${cleanName}.pdf>Descargar RenunciaResponsabilidad ${name}</a></p>
            <p><a href=/download?file=MetodosDePago${cleanName}.pdf>Descargar MetodosDePago ${name}</a></p>
        `)
    } catch (error) {
        console.log("Error generando el PDF", error)
        res.status(500).send("Ocurrio un error generando el pdf");
    }
});

// Nueva ruta para manejar la descarga de archivos
index.get('/download', (req, res) => {
    const fileName = req.query.file; // Obtener el nombre del archivo desde la URL
    const filePath = path.join(__dirname, 'output', fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
            res.status(500).send('Error al descargar el archivo.');
        }
    });
});

index.listen(port, () => {
    console.log(`Running server on port ${port}`);
});