const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fontkit = require('@pdf-lib/fontkit')
const fs = require('fs')
const fontBytes = fs.readFileSync('./fonts/ARIALBOLDMT.OTF')

// Datos de prueba, debe ser eliminado
// const sr = 'Prueba'
// const nameClient = "Nombre APELLIDOS"
// const fechaEs = 'Mes Dia, 202X'


async function modifyPdf(sr, nameClient, fechaEs) {
    const pdfDoc = await PDFDocument.load(fs.readFileSync('./PDFs/1.Bienvenida.pdf'));
    
    pdfDoc.registerFontkit(fontkit);
    const ArialFuente = await pdfDoc.embedFont(fontBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
  
    firstPage.drawText(sr, {
        x: 72,
        y: 552,
        size: 12,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });    

    firstPage.drawText(nameClient, {
        x: 72,
        y: 540,
        size: 12,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });

    firstPage.drawText(fechaEs, {
        x: 72,
        y: 620,
        size: 12,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });   

    const pdfBytes = await pdfDoc.save();
    const cleanName = nameClient.replace(/\s+/g, '');
    fs.writeFileSync(`./output/Bienvenida${cleanName}.pdf`, pdfBytes);

    console.log("PDF modificado y guardado en 'output/1.Bienvenida.pdf")
}

module.exports = modifyPdf;