const pdfmake = require('pdfmake');
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

// Exportar la función que genera y guarda el PDF
async function pagare(name, fechaEs, dir1, dir2, num, email) {

    try {  
        // crear instancia de pdf make
        const printer = new pdfmake(fonts);

        // definir contenido del documento
        const docDefinition = {

            // Definir los márgenes de la página: [izquierda, arriba, derecha, abajo]
            pageMargins: [72, 72, 72, 72],

            content: [
                { 
                    text: 'PAGARÉ a la Orden de MIGRACIÓN LATINA LLC', 
                    bold: true,
                    alignment: 'right',
                    margin: [0, 0, 0, 5]
                },
                { 
                    text: 'PROMISSORY NOTE Payable to the Order of MIGRACION LATINA LLC', 
                    bold: true,
                    alignment: 'right',
                    margin: [0, 0, 0, 55]
                },
                {
                text: [`(${name})`, ' identificado(a) con Pasaporte No.  ID , de Pais, quien en adelante se llamará ', 'EL DEUDOR', ', debidamente entiende, reconoce y acepta el financiamiento que a su nombre proporcionará ', 'Migración Latina LLC', ' con el objeto cubrir los gastos de su proceso migratorio.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: [`(${name})`, ' identified with Passport No. ID, from Pais, who hereinafter will be called ', 'THE DEBTOR', ', duly understands, acknowledges and accepts the financing that ', 'Migración Latina LLC', ' will provide on his/her behalf in order to cover the costs of his/her immigration process.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: ['PRIMERO. ', 'EL DEUDOR', ' pagará incondicionalmente y según lo pactado a través del ', 'Contrato', ' o de cualquier otro medio, un valor mensual hasta la totalidad del costo a financiar, según dicho ', 'Contrato', '.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: 'Valor por concepto de Capital Total a Financiar:',
                bold: true,
                margin: [0, 5, 0, 15]
                },
                {
                    ul: [
                      { text: `Financiamiento`, bold: true },
                      { text: `(Financiamiento USD)`, bold: true }
                    ],
                    margin: [10, 0, 0, 10]
                },
                {
                text: 'Tiempo de Financiamiento (Pagos Mensuales):',
                bold: true,
                margin: [0, 5, 0, 10]
                },
                {
                text: [`Meses: `, { text: `Meses`, bold: true }],
                margin: [0, 0, 0, 20]
                },
                {
                text: ['FIRST. ', 'THE DEBTOR', ' shall pay unconditionally and as agreed by telephone or through the ', 'Contract', ', a monthly value up to the total cost to be financed, according to the contract.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: 'Value for concept of Total Capital to Finance:',
                bold: true,
                margin: [0, 5, 0, 15]
                },
                {
                    ul: [
                      { text: `Financiamiento`, bold: true },
                      { text: `($Financiamiento USD)`, bold: true }
                    ],
                    margin: [10, 0, 0, 10]
                  },
                {
                text: 'Time of Financing (Monthly Payments):',
                bold: true,
                margin: [0, 5, 0, 10]
                },
                {
                text: [`Months: `, { text: `Meses`, bold: true }],
                margin: [0, 0, 0, 20]
                },
                {
                text: ['SEGUNDO. ', 'Sobre la suma adeudada por concepto de Capital, ', 'EL DEUDOR', ' reconocerá y aceptará cargos por mora de ', '$100.00', ' USD a manera de penalidad cargado a su siguiente pago. De igual manera se cargará a la cuenta de ', 'EL DEUDOR', ' la suma de ', '$50.00', ' USD en el caso de que haya un cheque devuelto.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: ['SECOND. ', 'On the amount owed for Principal, ', 'THE DEBTOR', ' will acknowledge and accept late charges of ', '$100.00', ' USD as a penalty charged to his next payment. ', 'THE DEBTOR', ' account will also be charged the sum of ', '$50.00', ' USD in the event of a returned check.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: ['TERCERO. ', 'EL DEUDOR', ' asume la totalidad de los gastos que ocasione la ejecución de esta ', 'Pagaré', ', en caso de Cobro Jurídico.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: ['THIRD. ', 'THE DEBTOR', ' assumes all costs incurred in the enforcement of this ', 'Promissory Note', ' in the event of legal collection.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: ['CUARTO. ', 'EL DEUDOR', ', en caso de tomar la decisión de no continuar con su proceso, reconoce que no lo exime y tiene la responsabilidad del pago total de la deuda a nuestra Compañía, entendiendo que nosotros ya hemos asumido el 100% del costo desde el inicio de su proceso.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15]
                },
                {
                text: ['FOURTH. ', 'THE DEBTOR', ', in the event that he/she decides not to continue with the process, acknowledges that this does not exempt him/her from, and he/she is responsible for the total payment of the debt to our Company, understanding that we have already assumed 100% of the cost from the beginning of the process.'],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: [`Este Pagaré, se diligencia de conformidad a las condiciones del Contrato anexo, en ${fechaEs}.`],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: [`This Promissory Note is executed in accordance with the terms of the attached Contract, on ${fechaEs}.`],
                style: 'paragraph',
                margin: [0, 0, 0, 50],
                alignment: 'justify',
                },
                {
                text: '____________________________________',
                margin: [0, 0, 0, 5]
                },
                {
                text: name,
                bold: true,
                margin: [0, 0, 0, 5]
                },
                {
                text: dir1,
                bold: true,
                margin: [0, 0, 0, 5]
                },
                {
                text: dir2,
                bold: true,
                margin: [0, 0, 0, 5]
                },
                {
                text: num,
                bold: true,
                margin: [0, 0, 0, 5]
                },
                {
                text: email,
                bold: true,
                margin: [0, 0, 0, 30]
                },
                {
                text: '_________________________________',
                margin: [0, 0, 0, 5]
                },
                {
                text: 'MIGRACION LATINA',
                bold: true,
                margin: [0, 0, 0, 5]
                },
                {
                text: 'Alejandra Holcomb',
                bold: true,
                margin: [0, 0, 0, 5]
                },
                {
                text: 'General Manager',
                bold: true,
                margin: [0, 0, 0, 5]
                }
               
            ],
            styles: {
                paragraph: {
                  fontSize: 12,
                  lineHeight: 1.5
                }
              },
              defaultStyle: {
                font: 'Roboto'
            }
        };

        // NO FUNCIONA textos en negrita y subrayuados NO FUNCIONA
        docDefinition.content.forEach(element => {
            if (element.text && Array.isArray(element.text)) {
              for (let i = 0; i < element.text.length; i++) {
                if (typeof element.text[i] === 'string') {
                  if (element.text[i] === 'EL DEUDOR' || element.text[i] === 'THE DEBTOR') {
                    element.text[i] = { text: element.text[i], bold: true, italics: true };
                  } else if (element.text[i] === 'Migración Latina LLC' || 
                            element.text[i] === 'Contrato' || 
                            element.text[i] === 'Contract' || 
                            element.text[i] === 'Pagaré' || 
                            element.text[i] === 'Promissory Note' ||
                            element.text[i] === '$100.00' || 
                            element.text[i] === '$50.00') {
                    element.text[i] = { text: element.text[i], bold: true };
                  }
                }
              }
            }
        });

        // generar pdf
        const pdfDoc = printer.createPdfKitDocument(docDefinition);

        // Eliminar espacios en el nombre del cliente para usarlo añadido al nombre del pdf
        const cleanName = name.replace(/\s+/g, '');

        console.log("pdf pagare creado en memoria listo para guardar")

        // ruta de almacenamiento y nombre
        //const outputPathLocal = path.join(__dirname, 'tmp', `Pagare${cleanName}.pdf`); // ruta de Guardado en /tmp/ de local
        const outputPathVercel = `/tmp/Pagare${cleanName}.pdf`; // ruta de Guardado en /tmp/ de vercel

        // usa pipe para escribir el archivo 
        //const writeStream = fs.createWriteStream(outputPathLocal);
        const writeStream = fs.createWriteStream(outputPathVercel); // a ruta de vercel
        pdfDoc.pipe(writeStream);
        pdfDoc.end();
        
        // Esperar a que termine de escribir
        return new Promise((resolve, reject) => {
          writeStream.on('finish', () => {
              //console.log("PDF guardado exitosamente en local");
              //resolve(outputPathLocal);
              console.log("PDF guardado exitosamente en Vercel");
              resolve(outputPathVercel);
          });
          
          writeStream.on('error', (err) => {
              console.error("Error al guardar el PDF:", err);
              reject(err);
          });
        });

    } catch (error) {
        console.error('Error en la generación del pagaré:', error);
        throw error;
    }
};


module.exports = pagare;
