const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fontkit = require('@pdf-lib/fontkit')
const fs = require('fs')
// direccion a fuente
//const fontBytes = fs.readFileSync('./fonts/ARIALBOLDMT.OTF')
const path = require('path');
const fontPath = path.join(process.cwd(), 'public', 'fonts', 'ARIALBOLDMT.OTF');
const fontBytes = fs.readFileSync(fontPath);



async function modifyPdf(sr, nameClient, fechaEs) {
    //const pdfDoc = await PDFDocument.load(fs.readFileSync('./public/pdfs/Bienvenida.pdf'));
    const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(process.cwd(), 'public', 'pdfs', 'Bienvenida.pdf')));

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

    console.log("pdf creado pero no guardado")
    // save en carpeta temporal de vercel
    const tempFilePath = path.join(process.cwd(), 'tmp', `Bienvenida${cleanName}.pdf`);
    fs.writeFileSync(tempFilePath, pdfBytes);

    console.log("PDF modificado y guardado en 'tmp/1.Bienvenida.pdf")
}

module.exports = modifyPdf;