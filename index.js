const express = require('express')
const path = require('path')
const index = express()

const port = process.env.PORT || 3000; // de forma local 3000, en vercel asignara un puerto

const modifyPdf = require('./Bienvenida')
const AcuerdoServicios = require('./AcuerdoServicios');
const CertificaciondeVerdadCliente = require('./CertificaciondeVerdadCliente');
const DeclaracionCertificacion = require('./DeclaracionCertificacion');
//const pagare = require('./pagare')

// ruta para servir el index.html en pagina principal
index.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware para servir archivos estáticos (permite encontrar y servir styles.css)
index.use(express.static(path.join(process.cwd(), 'public')))

index.get('/status', (req, res) => {
    res.send({
        up: true
    });
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
    console.log(`Datos recibidos: Nombre ${name}, correo: ${email}`)
    
    try {
        await modifyPdf(`${srA || mrS}`, name, fechaEs) 
        await CertificaciondeVerdadCliente(fechaEs, fechaEn, name, dir1, dir2, num, email)
        await DeclaracionCertificacion(fechaEs, name)
        //await AcuerdoServicios(fechaEs, fechaEn, name) 
        //await pagare();

        const cleanName = name.replace(/\s+/g, '');

        // Meter aqui el link de "Descargar PDF"
        //const downloadLink = `/download?file=Bienvenida${cleanName}.pdf`; // para tener nombre en el pdf, puede ir directo en el link
        res.send(`
            <h2>PDF generado para: ${name}.</h2>
            <p><a href=/download?file=Bienvenida${cleanName}.pdf>Descargar Bienvenida ${name}</a></p>
            <p><a href=/download?file=CertificaciondeVerdadCliente${cleanName}.pdf>Descargar CertificacionDeVerdad ${name}</a></p>
            <p><a href=/download?file=DeclaracionyCertificaciondelPeticionario${cleanName}.pdf>Descargar DeclaracionyCertificacion ${name}</a></p>
            <p><a href=/download?file=AcuerdosDeServicio.pdf>Descargar AcuerdosDeServicio ${name}</a></p>
            <p><a href=/download?file=EsquemaPago.pdf>Descargar EsquemaPago ${name}</a></p>
            <p><a href=/download?file=Pagare.pdf>Descargar Pagare ${name}</a></p>
            <p><a href=/download?file=RenunciaResponsabilidad.pdf>Descargar RenunciaResponsabilidad ${name}</a></p>
            <p><a href=/download?file=MetodosDePago.pdf>Descargar MetodosDePago ${name}</a></p>
        `)
    } catch (error) {
        console.log("Error generando el PDF", error)
        res.status(500).send("Ocurrio un error generando el pdf");
    }
});

// Nueva ruta para manejar la descarga de archivos
index.get('/download', (req, res) => {
    const fileName = req.query.file; // Obtener el nombre del archivo desde la URL Ejemplo "Bienvenida.pdf"

    // Cambio de local a vercel aqui
    //const filePath = path.join(process.cwd(), 'tmp', fileName); // buscar el pdf en tmp de disco local
    const filePath = `/tmp/${fileName}`; // -> /tmp/Bienvenida.pdf  buscar el pdf en /tmp/ de vercel

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