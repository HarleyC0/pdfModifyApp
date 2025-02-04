const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');
const path = require('path');

// Cargar la fuente desde el directorio público
const fontPath = path.join(process.cwd(), 'public', 'fonts', 'ARIALBOLDMT.OTF');
const fontBytes = fs.readFileSync(fontPath);

async function modifyPdf(sr, nameClient, fechaEs) {
    try {
        // Cargar el documento PDF base
        const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(process.cwd(), 'public', 'pdfs', 'Bienvenida.pdf')));

        // Registrar la fuente
        pdfDoc.registerFontkit(fontkit);
        const ArialFuente = await pdfDoc.embedFont(fontBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Dibujar el texto en el PDF
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

        // Guardar el PDF en memoria como un Buffer
        const pdfBytes = await pdfDoc.save();
        const tempFilePath = `tmp/BienvenidaPruebaBuffer.pdf`;
        fs.writeFileSync(tempFilePath, pdfBytes);
        // Devolver el PDF como un Buffer
        return pdfBytes; // El Buffer se puede enviar directamente en la respuesta HTTP
    } catch (error) {
        console.error('Error generando el PDF:', error);
        throw error;
    }
}

module.exports = modifyPdf;