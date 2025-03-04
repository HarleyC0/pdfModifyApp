const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fontkit = require('@pdf-lib/fontkit')
const fs = require('fs')
const path = require('path');
const fontPath = path.join(process.cwd(), 'public', 'fonts', 'ARIALBOLDMT.OTF');
const fontBytes = fs.readFileSync(fontPath);



async function CertificaciondeVerdadCliente(fechaEs, fechaEn, name, dir1, dir2, num, email) {
    // cargar pdf referencia
    const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(process.cwd(), 'public', 'pdfs', 'CertificaciondeVerdadCliente.pdf')));

    // cargar fuente
    pdfDoc.registerFontkit(fontkit);
    const ArialFuente = await pdfDoc.embedFont(fontBytes);

    // manejar las paginas existentes
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    // Constantes de la paguina
    const { width, height } = firstPage.getSize()  // tamaño de pag 
    const fontSize = 12 // tamaño de letra
    const marginLeft = 85 
  
    // medidas de salto de linea
    const lineHeight = fontSize * 1.2; // Espaciado entre líneas (20% más que el tamaño de la fuente)
    let yPosition = height - 100; // Posición inicial en la parte superior

    firstPage.drawText(fechaEs, {
        x: marginLeft,
        y: yPosition,
        size: fontSize,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });  
    yPosition -= lineHeight;

    firstPage.drawText(fechaEn, {
        x: marginLeft,
        y: yPosition,
        size: fontSize,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    }); 
    yPosition = yPosition - lineHeight*26;

    firstPage.drawText(name, {
        x: marginLeft,
        y: yPosition,
        size: fontSize,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });  
    yPosition -= lineHeight;  
    
    firstPage.drawText(dir1, {
        x: marginLeft,
        y: yPosition,
        size: fontSize,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });  
    yPosition -= lineHeight; 

    firstPage.drawText(dir2, {
        x: marginLeft,
        y: yPosition,
        size: fontSize,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });  
    yPosition -= lineHeight; 

    firstPage.drawText(num, {
        x: marginLeft,
        y: yPosition,
        size: fontSize,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });  
    yPosition -= lineHeight;

    firstPage.drawText(email, {
        x: marginLeft,
        y: yPosition,
        size: fontSize,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });  
    yPosition -= lineHeight;

    // guardar pdf en memoria
    const pdfBytes = await pdfDoc.save();
    // Eliminar espacios en el nombre del cliente para usarlo añadido al nombre del pdf
    const cleanName = name.replace(/\s+/g, '');

    console.log("pdf certificaciondeverdadcliente creado en memoria listo para guardar")

    // Cambio de local a vercel aqui
    //const tempFilePath = path.join(process.cwd(), 'tmp', `CertificaciondeVerdadCliente.pdf`); // Guargado en tmp de disco local
    //fs.writeFileSync(tempFilePath, pdfBytes);
    const tmpVercel = `/tmp/CertificaciondeVerdadCliente${cleanName}.pdf`; // Guargado en /tmp/ de vercel
    fs.writeFileSync(tmpVercel, pdfBytes);

    console.log("PDF modificado y guardado en 'tmp/CertificaciondeVerdadCliente.pdf")
}

module.exports = CertificaciondeVerdadCliente;