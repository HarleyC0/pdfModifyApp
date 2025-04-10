const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

// Configurar las fuentes
const fonts = {
    Roboto: {
        normal: path.join(__dirname, 'public/fonts/02587_ARIALMT.ttf'),
        bold: path.join(__dirname, 'public/fonts/02587_ARIALMT.ttf'),
        italics: path.join(__dirname, 'public/fonts/02587_ARIALMT.ttf'),
        bolditalics: path.join(__dirname, 'public/fonts/02587_ARIALMT.ttf')
    }
};

const printer = new PdfPrinter(fonts);

// Exportar la función que genera y guarda el PDF
async function pagare() {
    const docDefinition = {
        content: [
            { 
                text: 'PAGARÉ a la Orden de MIGRACIÓN LATINA LLC', 
                style: 'header',
                alignment: 'right'
            },
            { 
                text: 'PROMISSORY NOTE Payable to the Order of MIGRACION LATINA LLC', 
                style: 'header',
                alignment: 'right',
                margin: [0, 10, 0, 20]
            },
            {
                text: [
                    { text: '(Nombres APELLIDOS) ', style: 'boldUnderline' },
                    { text: 'identificado(a) con Pasaporte No. XXXXXX, de Pais, quien en adelante se llamará EL DEUDOR, debidamente entiende, reconoce y acepta el financiamiento que a su nombre proporcionará Migración Latina LLC con el objeto cubrir los gastos de su proceso migratorio.' }
                ],
                margin: [0, 0, 0, 15]
            },
            { 
                text: '(Nombres APELLIDOS)', 
                style: 'boldUnderline',
                margin: [0, 0, 0, 5]
            },
            { 
                text: 'identified with Passport No. XXXXXX, from Pais, who hereinafter will be called THE DEBTOR, duly understands, acknowledges and accepts the financing that Migración Latina LLC will provide on his/her behalf in order to cover the costs of his/her immigration process.', 
                margin: [0, 0, 0, 15]
            },
            { 
                text: 'PRIMERO. EL DEUDOR pagará incondicionalmente y según lo pactado a través del Contrato o de cualquier otro medio, un valor mensual hasta la totalidad del costo a financiar, según dicho Contrato.', 
                margin: [0, 10, 0, 10]
            },
            { 
                text: 'Valor por concepto de Capital Total a Financiar:',
                margin: [0, 5, 0, 5]
            },
            {
                ul: [
                    'Valor en letras dólares americanos',
                    '($X,XXX.00 USD)'
                ],
                margin: [0, 0, 0, 10]
            },
            { 
                text: 'Tiempo de Financiamiento (Pagos Mensuales):',
                margin: [0, 5, 0, 5]
            },
            { 
                text: 'Meses: 00'
            }
        ],
        styles: {
            header: {
                bold: true,
                fontSize: 14
            },
            boldUnderline: {
                bold: true,
                decoration: 'underline',
                fontSize: 12
            }
        }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const outputPath = path.join(__dirname, 'tmp', 'pagare.pdf');

    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(outputPath);

        pdfDoc.pipe(writeStream);

        pdfDoc.end();

        writeStream.on('finish', () => {
            resolve(outputPath); // Retornamos la ruta del archivo generado
        });

        writeStream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = pagare;
