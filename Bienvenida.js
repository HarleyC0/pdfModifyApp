const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fontkit = require('@pdf-lib/fontkit')
const fs = require('fs')
const path = require('path');
const fontPath = path.join(process.cwd(), 'public', 'fonts', 'ARIALBOLDMT.OTF');
const fontBytes = fs.readFileSync(fontPath);




async function modifyPdf(srA, nameClient, fechasArray) {

    const identified = srA == "Sr" ? ["Sr.", "Mr."] : ["Sra.", "Ms."];

    //const pdfDoc = await PDFDocument.load(fs.readFileSync('./public/pdfs/Bienvenida.pdf'));
    const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(process.cwd(), 'public', 'pdfs', 'Bienvenida.pdf')));

    pdfDoc.registerFontkit(fontkit);
    const ArialFuente = await pdfDoc.embedFont(fontBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
  
    firstPage.drawText(identified[1], {
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

    firstPage.drawText(fechasArray[0], {
        x: 72,
        y: 620,
        size: 12,
        font: ArialFuente,
        color: rgb(0, 0, 0),
    });   

    // guardar pdf en memoria
    const pdfBytes = await pdfDoc.save();
    const cleanName = nameClient.replace(/\s+/g, '');

    console.log("pdf Bienvenida creado en memoria listo para guardar")

    // Cambio de local a vercel aqui
    //const tempFilePath = path.join(process.cwd(), 'tmp', `Bienvenida${cleanName}.pdf`); // Guargado en tmp de disco local
    //fs.writeFileSync(tempFilePath, pdfBytes);
    const tmpVercel = `/tmp/Bienvenida${cleanName}.pdf`; // Guargado en /tmp/ de vercel
    fs.writeFileSync(tmpVercel, pdfBytes);

    console.log("PDF modificado y guardado en 'tmp/Bienvenida.pdf")
}

module.exports = modifyPdf;