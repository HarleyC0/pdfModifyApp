const pdfmake = require('pdfmake');
const fs = require('fs');
const path = require('path');
const { text } = require('stream/consumers');

// Configurar las fuentes
const fonts = {
    Arial: {
        normal: path.join(__dirname, 'public/fonts/02587_ARIALMT.ttf'),
        bold: path.join(__dirname, 'public/fonts/ARIALBOLDMT.OTF'),
        italics: path.join(__dirname, 'public/fonts/2248-font.ttf'), // Bold Italic
    }
};

// Exportar la función que genera y guarda el PDF
async function pagare(name, fechasArray, dir1, dir2, num, email, srA, pasaporte, pais, numCuotas, valorLetrasFinanciamientoEs, valorLetrasFinanciamientoEn, valorNumerosFinanciamiento) {

    const identified = srA == "Sr" ? "identificado" : "identificada";

    try {  
        // crear instancia de pdf make
        const printer = new pdfmake(fonts);

        // definir contenido del documento
        const docDefinition = {

            // Definir los márgenes de la página: [izquierda, arriba, derecha, abajo]
            pageMargins: [70, 120, 70, 120],

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
                text: [
                  {text: `(${name})`, bold: true, decoration: 'underline'}, 
                  `${identified}`, 
                  'con Pasaporte No. ',
                  {text: `${pasaporte}`, bold: true}, 
                  ' de ',
                  `${pais}`, 
                  ', quien en adelante se llamará ', 
                  {text: "EL DEUDOR", italics: true}, 
                  ', debidamente entiende, reconoce y acepta el financiamiento que a su nombre proporcionará ', 
                  {text: "Migración Latina LLC", bold: true}, 
                  ' con el objeto cubrir los gastos de su proceso migratorio.'],
                style: 'paragraph',
                margin: [0, 0, 0, 20],
                alignment: 'justify',
                },
                {
                text: [
                  {text: `(${name})`, bold: true, decoration: 'underline'}, 
                  'identified with Passport No. ',
                  {text: `${pasaporte}`, bold: true}, 
                  ' from ',
                  `${pais}`, 
                  ', who hereinafter will be called ', 
                  {text: "THE DEBTOR", italics: true}, 
                  ', duly understands, acknowledges and accepts the financing that ', 
                  {text: "Migración Latina LLC", bold: true}, 
                  ' will provide on his/her behalf in order to cover the costs of his/her immigration process.'                  ],
                style: 'paragraph',
                margin: [0, 0, 0, 20],
                alignment: 'justify',
                },
                {
                text: [{text: 'PRIMERO.', bold:true}, {text: 'EL DEUDOR', italics:true}, 
                ' pagará incondicionalmente y según lo pactado a través del ', 
                {text: 'Contrato', bold:true}, 
                ' o de cualquier otro medio, un valor mensual hasta la totalidad del costo a financiar, según dicho ', 
                {text: 'Contrato.', bold:true}],
                style: 'paragraph',
                margin: [0, 0, 0, 20],
                alignment: 'justify',
                },

                // conceptos
                {
                text: 'Valor por concepto de Capital Total a Financiar:',
                bold: true,
                margin: [0, 5, 0, 25]
                },
                {
                    ul: [
                      { text: `${valorLetrasFinanciamientoEs} dólares americanos`, bold: true },
                      { text: `(${valorNumerosFinanciamiento} USD)`, bold: true }
                    ],
                    margin: [15, 0, 0, 20]
                },
                {
                text: 'Tiempo de Financiamiento (Pagos Mensuales):',
                bold: true,
                margin: [0, 5, 0, 10]
                },
                {
                text: ['Meses: ', { text: `${String(numCuotas).padStart(2, '0')}`, bold: true }],
                margin: [0, 0, 0, 20]
                },
                {
                text: [{text: 'FIRST.', bold:true}, {text: 'THE DEBTOR', italics: true}, 
                ' shall pay unconditionally and as agreed by telephone or through the ', 
                {text: 'Contract', bold:true},
                ', a monthly value up to the total cost to be financed, according to the ', 
                {text: 'Contract.', bold:true}],
                style: 'paragraph',
                margin: [0, 0, 0, 20],
                alignment: 'justify',
                },
                {
                text: 'Value for concept of Total Capital to Finance:',
                bold: true,
                margin: [0, 5, 0, 25]
                },
                {
                    ul: [
                      { text: `${valorLetrasFinanciamientoEn} dollars`, bold: true },
                      { text: `(${valorNumerosFinanciamiento} USD)`, bold: true }
                    ],
                    margin: [15, 0, 0, 20]
                  },
                {
                text: 'Time of Financing (Monthly Payments):',
                bold: true,
                margin: [0, 5, 0, 10]
                },
                {
                text: ['Months: ', { text: `${String(numCuotas).padStart(2, '0')}`, bold: true }],
                margin: [0, 0, 0, 30]
                },
                {
                text: [
                  {text: 'SEGUNDO. ', bold:true}, 
                  'Sobre la suma adeudada por concepto de Capital, ', 
                  {text: 'EL DEUDOR', italics:true}, 
                  ' reconocerá y aceptará cargos por mora de ', 
                  {text: '$100.00', bold:true}, 
                  ' USD a manera de penalidad cargado a su siguiente pago. De igual manera se cargará a la cuenta de ', 
                  {text: 'EL DEUDOR', italics:true}, 
                  ' la suma de ', 
                  {text: '$50.00', bold:true}, 
                  ' USD en el caso de que haya un cheque devuelto.'],
                style: 'paragraph',
                margin: [0, 0, 0, 20],
                alignment: 'justify',
                },
                {
                text: [
                  {text: 'SECOND.', bold:true}, 
                  ' On the amount owed for Principal, ', 
                  {text: 'THE DEBTOR', italics:true}, 
                  ' will acknowledge and accept late charges of ', 
                  {text: '$100.00', bold:true}, 
                  ' USD as a penalty charged to his next payment. ', 
                  {text: 'THE DEBTOR', italics:true}, 
                  ' account will also be charged the sum of  ', 
                  {text: '$50.00', bold:true}, 
                  ' USD in the event of a returned check.'                  
                ],
                style: 'paragraph',
                margin: [0, 0, 0, 20],
                alignment: 'justify',
                },
                {
                text: [
                  {text: 'TERCERO. ', bold: true}, {text: 'EL DEUDOR', italics: true}, 
                  ' asume la totalidad de los gastos que ocasione la ejecución de esta ', 
                  {text: 'Pagaré', bold: true}, 
                  ', en caso de Cobro Jurídico.'],
                style: 'paragraph',
                margin: [0, 0, 0, 20],
                alignment: 'justify',
                },
                {
                text: [
                  {text: 'THIRD. ', bold: true}, 
                  {text: 'THE DEBTOR', italics: true}, 
                  ' assumes all costs incurred in the enforcement of this ', 
                  {text: 'Promissory Note', bold: true}, 
                  ' in the event of legal collection.'],
                style: 'paragraph',
                margin: [0, 0, 0, 20],
                alignment: 'justify',
                },
                {
                text: [
                  {text: 'CUARTO. ', bold: true}, 
                  {text: 'EL DEUDOR', italics: true},
                  ', en caso de tomar la decisión de no continuar con su proceso, reconoce que no lo exime y tiene la responsabilidad del pago total de la deuda a nuestra Compañía, entendiendo que nosotros ya hemos asumido el 100% del costo desde el inicio de su proceso.'],
                style: 'paragraph',
                margin: [0, 0, 0, 20]
                },
                {
                text: [
                  {text: 'FOURTH. ', bold: true}, 
                  {text: 'THE DEBTOR', italics: true}, 
                  ', in the event that he/she decides not to continue with the process, acknowledges that this does not exempt him/her from, and he/she is responsible for the total payment of the debt to our Company, understanding that we have already assumed 100% of the cost from the beginning of the process.'],
                style: 'paragraph',
                margin: [0, 0, 0, 20],
                alignment: 'justify',
                },
                {
                text: [
                  {text: 'Este Pagaré', bold:true},
                  ', se diligencia de conformidad a las condiciones del ', 
                  {text: 'Contrato', bold: true},
                  'anexo, en ',
                  {text: `${fechasArray[2]}`, bold: true}
                  ],
                style: 'paragraph',
                margin: [0, 0, 0, 15],
                alignment: 'justify',
                },
                {
                text: [
                  {text: 'This Promissory Note', bold:true},
                  ' is executed in accordance with the terms of the attached ', 
                  {text: 'Contract', bold: true},
                  ', on ',
                  {text: `${fechasArray[2]}`, bold: true}
                ],
                style: 'paragraph',
                margin: [0, 0, 0, 60],
                alignment: 'justify',
                },

                // firma
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
                margin: [0, 0, 0, 40]
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
                font: 'Arial'
            }
        };

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
