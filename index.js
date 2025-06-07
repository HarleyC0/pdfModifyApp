const express = require('express')
const path = require('path')
const index = express()

const port = process.env.PORT || 3000; // de forma local 3000, en vercel asignara un puerto

const modifyPdf = require('./Bienvenida')
const CertificaciondeVerdadCliente = require('./CertificaciondeVerdadCliente');
const DeclaracionCertificacion = require('./DeclaracionCertificacion');
const acuerdosDeServicio = require('./acuerdosDeServicio');
const pagare = require('./pagare')
const anexo1 = require('./anexo1');
const renunciaResponsabilidad = require('./renunciaResponsabilidad');
const metodosDePago = require('./metodosDePago');
const formatofecha = require('./fechasFormato');

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
        'name': name,
        'fecha': fecha,
        'dir1': dir1,
        'dir2': dir2,
        'num': num,
        'email': email,
        'pais': pais,
        'pasaporte': pasaporte,
        'nameAgent': nameAgent,
        'pagoTotal': pagoTotal,
        'pagoInicial': pagoInicial,
        'numCuotas': numCuotas,
        'valorCuotas': valorCuotas,
        'valorLetrasFinanciamientoEs': valorLetrasFinanciamientoEs,
        'valorLetrasFinanciamientoEn': valorLetrasFinanciamientoEn,
        'valorNumerosFinanciamiento': valorNumerosFinanciamiento,
        'numBeneficiarios' : numBeneficiarios,
    } = req.body;
    console.log(`Datos recibidos: Nombre ${name}, correo: ${email}`)
    
    // Para campos dinámicos, accede directamente a req.body
    const beneficiarios = [];
    const numBeneficiariosInt = 2*parseInt(numBeneficiarios);

    for (let i = 1; i <= numBeneficiariosInt; i++) {
        const nombreBeneficiario = req.body[`nombreBeneficiario${i}`];
        
        if (nombreBeneficiario) {
            beneficiarios.push({
                nombre: nombreBeneficiario
            });
        }
    }

    try {
        const fechasArray = formatofecha(fecha)
        await modifyPdf(srA, name, fechasArray) 
        await CertificaciondeVerdadCliente(fechasArray, name, dir1, dir2, num, email)
        await DeclaracionCertificacion(fechasArray, name)
        await acuerdosDeServicio(fechasArray, name, dir1, dir2, num, email, beneficiarios, pagoTotal, pagoInicial, numCuotas, valorCuotas) 
        await anexo1(name, email, dir1, dir2, num, fechasArray, numCuotas, valorCuotas, pagoTotal, pagoInicial)
        await pagare(name, fechasArray, dir1, dir2, num, email, srA, pasaporte, pais, numCuotas, valorLetrasFinanciamientoEs, valorLetrasFinanciamientoEn, valorNumerosFinanciamiento);
        await renunciaResponsabilidad(name, fechasArray, dir1, dir2, num, email, srA, pagoTotal, numCuotas, valorCuotas);
        await metodosDePago(name, fechasArray, dir1, dir2, num, email, srA, nameAgent);

        const cleanName = name.replace(/\s+/g, '');

        // Meter aqui el link de "Descargar PDF"
        res.send(`
            <h2>PDF generado para: ${name}.</h2>
            <p><a href=/download?file=Bienvenida${cleanName}.pdf>Descargar Bienvenida ${name}</a></p>
            <p><a href=/download?file=CertificaciondeVerdadCliente${cleanName}.pdf>Descargar CertificacionDeVerdad ${name}</a></p>
            <p><a href=/download?file=DeclaracionyCertificaciondelPeticionario${cleanName}.pdf>Descargar DeclaracionyCertificacion ${name}</a></p>
            <p><a href=/download?file=AcuerdosDeServicio${cleanName}.pdf>Descargar Acuerdos De Servicio ${name}</a></p>
            <p><a href=/download?file=EsquemaDePago${cleanName}.pdf>Descargar Esquema de Pago ${name}</a></p>
            <p><a href=/download?file=Pagare${cleanName}.pdf>Descargar Pagare ${name}</a></p>
            <p><a href=/download?file=RenunciaDeResponsabilidad${cleanName}.pdf>Descargar RenunciaResponsabilidad ${name}</a></p>
            <p><a href=/download?file=MetodosDePago${cleanName}.pdf>Descargar MetodosDePago ${name}</a></p>
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