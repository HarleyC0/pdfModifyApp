const pdfmake = require('pdfmake');
const fs = require('fs');
const path = require('path');
const { text } = require('stream/consumers');
const { lineSplit } = require('pdf-lib');

// Configurar las fuentes
const fonts = {
    Arial: {
        normal: path.join(__dirname, 'public/fonts/02587_ARIALMT.ttf'),
        bold: path.join(__dirname, 'public/fonts/ARIALBOLDMT.OTF'),
        italics: path.join(__dirname, 'public/fonts/2248-font.ttf'), // Bold Italic
    }
};

async function metodosDePago(name, fechaEs, dir1, dir2, num, email, srA, nameAgent) {

    const identified = srA == "Sr" ? ["Sr.", "Mr."] : ["Sra.", "Ms."];

    try {
        // crear instancia de pdf make
        const printer = new pdfmake(fonts);

        // definir contenido del documento
        const docDefinition = {

            // Definir los márgenes de la página: [izquierda, arriba, derecha, abajo]
            pageMargins: [70, 120, 70, 120],

            header: 
            {
              image: 'public/images/ImagenML.jpg',
              width: 85,
              alignment: 'center',
              margin: [0, 25, 0, 0]
            },

            footer: {
                  width: 'auto', 
                  text: "110 S Hartford Ave. Suite 2532\nTulsa, OK 74120\n+1 (918) 212 - 0327\nWhatsApp +1 (539) 525 - 1561\nMigración Latina LLC\nwww.migracionlatina.com",
                  alignment: 'center',
                  fontSize: 8,
                  margin: [0, 25, 0, 0]
            }, 
            
            content: [
                // Fecha en español
                { text: `${fechaEs}`, bold: true, margin: [0, 0, 0, 15] },
                
                // Datos del cliente en español
                {
                    text: [
                    { text: `${identified[0]}\n` },    
                    { text: `${name}\n` },
                    { text: `${dir1}\n` },
                    { text: `${dir2}\n` },
                    { text: `${num}\n` },
                    { text: `${email}` }
                    ],
                    bold: true,
                    lineHeight: 1.1,
                    margin: [0, 0, 0, 20]
                },                
                
                // Párrafo de introducción en español
                {
                    text: [
                    'Para Migración latina es muy importante ofrecer un servicio de calidad, pensando siempre en adaptarse a las necesidades de nuestros clientes, es por lo que ponemos a su conocimiento nuestras formas de pago con el fin de que realice los depósitos que le corresponden acuerdo lo pactado y firmado en ',
                    { text: 'El Contrato', italics: true},
                    ],
                    alignment: 'justify',
                    margin: [0, 0, 0, 15], 
                },
                
                // Párrafo de recomendación en español
                { 
                text: 'Le recomendamos que conserve esta información ya que le serán de mucha utilidad a lo largo de su compromiso.',
                margin: [0, 0, 0, 15],
                alignment: 'justify', 
                },
                
                // Párrafo de advertencia en español
                {
                    text: [
                        { 
                        text: 'RECUERDE QUE EL BANCO NO RECIBE DINERO EN EFECTIVO',
                        bold: true,
                        },
                        '. Usted puede elaborar un cheque, enviarnos un Money Order, pagar con tarjeta débito, crédito o podrá realizar una transferencia bancaria a través de la plataforma ',
                        { text: 'ZELLE.', bold: true},
                    ],
                    margin: [0, 0, 0, 15],
                    alignment: 'justify',
                },
                
                // Bank of America
                {
                    ul: [
                        { text: 'Bank of America', bold: true, margin: [0,0,0,10] },
                        { text: [{ text: 'Nombre de la Cuenta: ', bold: true }, 'Migracion Latina'], listType: 'none'},
                        { text: [{ text: 'Cuenta No.: ', bold: true }, '305009314861'], listType: 'none'},
                        { text: [{ text: 'Ruta No.: ', bold: true }, '103000017'], listType: 'none'}
                    ],
                    margin: [10,0,0,10]
                },
                
                // Money Order
                {
                    ul: [
                        { text: 'Money Order:', bold: true, margin: [0,0,0,0] },
                        {
                            text: [
                                { text: 'Migracion Latina LLC\n', listType: 'none'},
                                { text: '110 S Hartford Ave,\n', listType: 'none'},
                                { text: 'Suite 2532\n', listType: 'none'},
                                { text: 'Tulsa, OK 74120', listType: 'none'},
                            ],
                            margin: [80,0,0,10],
                            listType: 'none',
                            lineHeight: 1.1,
                        }
                    ],
                    margin: [10,0,0,10]
                },
                
                // Transferencias por Zelle
                {
                    ul: [
                        { text: 'Transferencias por Zelle', bold: true, margin: [0,0,0,10] },
                        { text: [{ text: 'Nombre: ', bold: true }, 'Migracion Latina'], listType: 'none'},
                        { text: [{ text: 'Correo Asociado: ', bold: true }, 'financial.manager@migracionlatina.com'], listType: 'none'},
                        { text: [{ text: 'Telefono Asociado: ', bold: true }, '(918) 861 - 6642'], listType: 'none'}
                    ],
                    margin: [10,0,0,10]
                },
                
                // Pago con tarjeta
                {
                ul: [
                    {
                        text: [
                            { text: 'Pago con tarjeta débito o crédito + 4%: ', bold: true },
                            'Llamar al (918) 861 - 6642'
                        ],
                        margin: [10,0,0,20]
                    }
                ]
                },
                
                // Párrafo final en español
                { 
                text: 'Si requiere ayuda para algún proceso de pago mencionado, no dude en contactarnos.',
                margin: [0, 0, 0, 40],
                alignment: 'justify' 
                },
                
                // Despedida en español
                { text: 'Cordialmente;', margin: [0, 0, 0, 120] },
                
                // Firma Agente
                
                // Datos del agente en español
                { text: [
                    `${nameAgent}\n`,
                    { text: 'Contacto@migracionlatina.com\n', decoration: 'underline'},
                    '(918) 212 - 0327\n',
                    'WhatsApp (539) 525 - 2014\n',
                    ],
                    bold: true,
                    lineHeight: 1.1,
                    margin: [0, 0, 0, 0],
                    pageBreak: 'after'
                },
                


                ///////// Cambio Ingles

                
                // Fecha en inglés
                { text: `${fechaEs}`, bold: true, margin: [0, 0, 0, 5] },
                
                // Datos del cliente en inglés
                {
                    text: [
                    { text: `${identified[1]}\n` },    
                    { text: `${name}\n` },
                    { text: `${dir1}\n` },
                    { text: `${dir2}\n` },
                    { text: `${num}\n` },
                    { text: `${email}` }
                    ],
                    bold: true,
                    lineHeight: 1.1,
                    margin: [0, 0, 0, 20]
                },
                
                // Saludo en inglés
                { text: 'Kind regards,', margin: [0, 0, 0, 10] },
                
                // Párrafo de introducción en inglés
                { 
                text: ['For Migracion Latina it is very important to offer a quality service, always thinking of adapting to the needs of our clients, which is why we make our payment methods available to you so that you can make the deposits that correspond to you according to the agreement and signed in ',
                    { text: 'The Contract', italics: true },
                    ],
                    alignment: 'justify',
                    margin: [0, 0, 0, 15],  
                },
                
                // Párrafo de recomendación en inglés
                { 
                text: 'We recommend that you please keep them as they will be very useful throughout your commitment.',
                margin: [0, 0, 0, 15],
                alignment: 'justify', 
                },
                
                // Párrafo de advertencia en inglés
                {
                    text: [
                        { 
                        text: 'REMEMBER THAT THE BANK DOES NOT RECEIVE CASH.',
                        bold: true,
                        },
                        ' You can write a check, send a Money Order, pay with debit card, credit card or you can make a bank transfer through the ',
                        { text: 'ZELLE', bold: true},
                        ' platform.'
                    ],
                    margin: [0, 0, 0, 15],
                    alignment: 'justify',
                },
                
                // Sección Bank of America en inglés
                {
                    ul: [
                        { text: 'Bank of America', bold: true, margin: [0,0,0,10] },
                        { text: [{ text: 'Account Name: ', bold: true }, 'Migracion Latina'], listType: 'none'},
                        { text: [{ text: 'Account #: ', bold: true }, '305009314861'], listType: 'none'},
                        { text: [{ text: 'Routing #: ', bold: true }, '103000017'], listType: 'none'}
                    ],
                    margin: [10,0,0,10]
                },
                
                // Money Order
                {
                    ul: [
                        { text: 'Money Order:', bold: true, margin: [0,0,0,0] },
                        {
                            text: [
                                { text: 'Migracion Latina LLC\n', listType: 'none'},
                                { text: '110 S Hartford Ave,\n', listType: 'none'},
                                { text: 'Suite 2532\n', listType: 'none'},
                                { text: 'Tulsa, OK 74120', listType: 'none'},
                            ],
                            margin: [80,0,0,10],
                            listType: 'none',
                            lineHeight: 1.1,
                        }
                    ],
                    margin: [10,0,0,10]
                },
                
                // Transferencias por Zelle
                {
                    ul: [
                        { text: 'Zelle Transfers', bold: true, margin: [0,0,0,10] },
                        { text: [{ text: 'Name: ', bold: true }, 'Migracion Latina'], listType: 'none'},
                        { text: [{ text: 'Email: ', bold: true }, 'financial.manager@migracionlatina.com'], listType: 'none'},
                        { text: [{ text: 'Phone: ', bold: true }, '(918) 861 - 6642'], listType: 'none'}
                    ],
                    margin: [10,0,0,10]
                },
                
                // Pago con tarjeta
                {
                ul: [
                    {
                        text: [
                            { text: '●	Pay with debit or credit card +4%: ', bold: true },
                            'Call (918) 861 - 6642'
                        ],
                        margin: [10,0,0,20]
                    }
                ]
                },
                
                // Párrafo final 
                { 
                text: 'Should you have any questions or concerns, please do not hesitate to contact us.',
                margin: [0, 0, 0, 40],
                alignment: 'justify' 
                },
                
                // Despedida 
                { text: 'Yours truly,', margin: [0, 0, 0, 120] },
                
                // Firma Agente
                
                // Datos del agente 
                { text: [
                    `${nameAgent}\n`,
                    { text: 'Contacto@migracionlatina.com\n', decoration: 'underline'},
                    '(918) 212 - 0327\n',
                    'WhatsApp (539) 525 - 2014\n',
                    ],
                    bold: true,
                    lineHeight: 1.1,
                    margin: [0, 0, 0, 50]
                },
            ],
            
            defaultStyle: {
                fontSize: 12,
                lineHeight: 1.5,
                font: 'Arial'                
            }           
            
        };

        // generar pdf
        const pdfDoc = printer.createPdfKitDocument(docDefinition);

        // Eliminar espacios en el nombre del cliente para usarlo añadido al nombre del pdf
        const cleanName = name.replace(/\s+/g, '');

        console.log("pdf metodos de pago creado en memoria listo para guardar")

        // ruta de almacenamiento y nombre
        //const outputPathLocal = path.join(__dirname, 'tmp', `MetodosDePago${cleanName}.pdf`); // ruta de Guardado en /tmp/ de local
        const outputPathVercel = `/tmp/MetodosDePago${cleanName}.pdf`; // ruta de Guardado en /tmp/ de vercel

        // usa pipe para escribir el archivo 
        //const writeStream = fs.createWriteStream(outputPathLocal);
        const writeStream = fs.createWriteStream(outputPathVercel); // a ruta de vercel
        pdfDoc.pipe(writeStream);
        pdfDoc.end();
        
        // Esperar a que termine de escribir
        return new Promise((resolve, reject) => {
          writeStream.on('finish', () => {
              //console.log("PDF MetodosDePago guardado exitosamente en local");
              //resolve(outputPathLocal);
              console.log("PDF MetodosDePago guardado exitosamente en Vercel");
              resolve(outputPathVercel);
          });
          
          writeStream.on('error', (err) => {
              console.error("Error al guardar el PDF:", err);
              reject(err);
          });
        });        
        
    } catch (error) {
        console.error('Error en la generación de Metodos de pago:', error);
        throw error;
    }
    
};

module.exports = metodosDePago;