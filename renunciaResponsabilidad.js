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
async function renunciaResponsabilidad(name, fechasArray, dir1, dir2, num, email, srA, pagoTotal, numCuotas, valorCuotas) {

    const identified = srA == "Sr" ? ["Sr.", "Mr."] : ["Sra.", "Ms."];

    try {
        // crear instancia de pdf make
        const printer = new pdfmake(fonts);

        // definir contenido del documento
        const docDefinition = {

            // Definir los márgenes de la página: [izquierda, arriba, derecha, abajo]
            pageMargins: [70, 120, 70, 120],

    // ========== AGREGAR MARCA DE AGUA "DEPRECADO" ========== 
    watermark: {
        text: 'DEPRECADO',
        color: 'gray',
        opacity: 0.3,
        bold: true,
        italics: false,
        fontSize: 80,
        angle: -45 // Diagonal
    },
    // ========== FIN MARCA DE AGUA ==========
            
            header: 
            {
              image: 'public/images/ImagenML.jpg',
              width: 80,
              alignment: 'center',
              margin: [0, 25, 0, 0]
            },

            footer: {
                  width: 'auto', 
                  text: ["110 S Hartford Ave. Suite 2532\nTulsa, OK 74120\n+1 (918) 212 - 0327\nWhatsApp +1 (539) 525 - 1561\nMigración Latina LLC\n",{text: 'www.migracionlatina.com', decoration: 'underline', color: 'blue'}],
                  alignment: 'center',
                  fontSize: 8,
                  margin: [0, 25, 0, 0]
            },            

            content: [
                // Fecha en español
                { text: `${fechasArray[0]}`, margin: [0, 0, 0, 10], bold: true },
                
                // Destinatario en español
                { text: `${identified[0]}`, margin: [0, 5, 0, 0], bold: true },
                { text: `${name}`, bold: true, margin: [0, 0, 0, 10] },
                
                // Referencia en español
                { text: 'REF: DISCLAIMER - LIBERACION DE RESPONSABILIDAD', bold: true, margin: [0, 0, 0, 10] },
                
                // Introducción en español
                { text: 'A continuación, se ponen a su entero conocimiento los términos y condiciones de este acuerdo, antes de iniciar su proceso:', margin: [0, 0, 0, 15], alignment: 'justify', },
                
                // Lista numerada en español
                {
                  ol: [
                    {text: 'Migración Latina LLC hará uso de todos sus esfuerzos éticos, legales y profesionales para llevar su caso, pero responsablemente no podemos garantizarle un resultado determinado, pues esto será siempre a decisión de una autoridad migratoria.', alignment: 'justify',},
                    { text: [
                        'El costo de su proceso es de ',
                        { text: `${pagoTotal} USD`, bold: true },
                        ' y tendrá ',
                        { text: `${String(numCuotas).padStart(2, '0')}`, bold: true },
                        ' cuotas de ',
                        { text: `$${valorCuotas}.00 USD`, bold: true },
                        ' cada una.'
                      ],
                      alignment: 'justify',
                    },
                    { text: [
                        'Su caso será radicado en el ',
                        {text: 'el Servicio de Ciudadanía e Inmigración de los Estados Unidos (USCIS).', bold: true}
                        ],
                        alignment: 'justify'
                    },
                    { text: [
                        'Junto con ',
                        { text: 'El Contrato', bold: true },
                        ' usted recibirá un ',
                        { text: 'Pagare', bold: true },
                        ' que deberá firmar el cual soporta el valor a financiar del proceso.'
                      ],
                      alignment: 'justify',
                    },
                    {text: 'El dinero del inicio de proceso y de las cuotas adicionales no podrán ser objeto de reintegros ahora ni a futuro.', alignment: 'justify'}
                  ],
                  margin: [15, 0, 0, 10]
                },
                
                // Cierre en español
                { text: 'Firmo a conformidad y bajo mi propia responsabilidad, declarando que estoy de acuerdo y entiendo todos y cada uno de los puntos anteriores.', margin: [0, 10, 0, 40], alignment: 'justify' },
                
                // Datos de firma cliente
                {
                  columns: [
                    {
                      width: '50%',
                      text: [
                        {
                            text: '.                                                      \n',
                            margin: [0, 0, 0, 2],
                            decoration: 'underline',
                        },
                        { text: `${name}\n` },
                        { text: `${dir1}\n` },
                        { text: `${dir2}\n` },
                        { text: `${num}\n` },
                        { text: `${email}` }
                      ],
                      bold: true,
                      lineHeight: 1.1,
                    },
                    {
                      width: '50%',
                      text: [
                        {
                            text: '.                                                      ',
                            margin: [0, 0, 0, 2],
                            decoration: 'underline',
                        },                        
                        { text: 'MIGRACION LATINA\n'},
                        { text: 'Alejandra Holcomb\n' },
                        { text: 'General Manager' }
                      ],
                      bold: true,
                      margin: [30, 0, 0, 0],
                      lineHeight: 1.1,
                    }
                  ],
                },
                
                // Separación entre versiones
                { text: '', margin: [0, 0, 0, 0], pageBreak: 'after', },
                



                // Versión en inglés
                // Fecha 
                { text: `${fechasArray[1]}`, margin: [0, 0, 0, 10], bold: true },
                
                // Destinatario 
                { text: `${identified[1]}`, margin: [0, 5, 0, 0], bold: true },
                { text: `${name}`, bold: true, margin: [0, 0, 0, 10] },
                
                // Referencia en inglés
                { text: 'REF: DISCLAIMER - LIABILITY RELEASE', bold: true, margin: [0, 0, 0, 10] },
                
                // Introducción en inglés
                { text: 'The terms and conditions of this agreement are hereby made known to you prior to initiating this process:', margin: [0, 0, 0, 10], alignment: 'justify' },
                
                // Lista numerada en inglés
                {
                  ol: [
                    {text: 'Migracion Latina LLC will use all its ethical, legal and professional efforts to handle your case, but responsibly we cannot guarantee a particular outcome, as this will always be at the discretion of an immigration authority.', alignment: 'justify'},
                    { text: [
                        'The cost of your process is ',
                        { text: `${pagoTotal} USD`, bold: true },
                        ' and you will have ',
                        { text: `${String(numCuotas).padStart(2, '0')}`, bold: true },
                        ' installments of ',
                        { text: `$${valorCuotas}.00 USD`, bold: true },
                        ' each one.'
                      ],
                      alignment: 'justify'
                    },
                    {text: [
                        'Your case will be filed with the',
                        {text: 'United States Citizenship and Immigration Services (USCIS).', bold: true}], 
                        alignment: 'justify'
                    },
                    {text:[
                        'Along with the ',
                        {text: 'Contract', bold:true}, 
                        ' you will receive a ',
                        {text: 'Promissory Note', bold:true}, 
                        ' that you will need to sign which supports the value to be financed for the process.'],
                        alignment: 'justify'},
                    {text:'The initial processing fee and additional fees will not be refundable neither now or in the future.',alignment: 'justify'}
                  ],
                  margin: [0, 0, 0, 10]
                },
                
                // Cierre en inglés
                { text: 'I sign in agreement and under my own responsibility, declaring that I agree and understand each and every one of the above items.', margin: [0, 10, 0, 40], alignment: 'justify' },
                
                // Datos de firma cliente
                {
                    columns: [
                        {
                        width: '50%',
                        text: [
                            {
                                text: '.                                                      \n',
                                margin: [0, 0, 0, 2],
                                decoration: 'underline',
                            },
                            { text: `${name}\n` },
                            { text: `${dir1}\n` },
                            { text: `${dir2}\n` },
                            { text: `${num}\n` },
                            { text: `${email}` }
                        ],
                        bold: true,
                        lineHeight: 1.1,
                        },
                        {
                        width: '50%',
                        text: [
                            {
                                text: '.                                                      ',
                                margin: [0, 0, 0, 2],
                                decoration: 'underline',
                            },                        
                            { text: 'MIGRACION LATINA\n'},
                            { text: 'Alejandra Holcomb\n' },
                            { text: 'General Manager' }
                        ],
                        bold: true,
                        margin: [30, 0, 0, 0],
                        lineHeight: 1.1,
                        }
                    ]
                },
              ],
              
              // Configuración por defecto
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

        console.log("pdf renuncia creado en memoria listo para guardar")

        // ruta de almacenamiento y nombre
        //const outputPathLocal = path.join(__dirname, 'tmp', `RenunciaDeResponsabilidad${cleanName}.pdf`); // ruta de Guardado en /tmp/ de local
        const outputPathVercel = `/tmp/RenunciaDeResponsabilidad${cleanName}.pdf`; // ruta de Guardado en /tmp/ de vercel

        // usa pipe para escribir el archivo 
        //const writeStream = fs.createWriteStream(outputPathLocal);
        const writeStream = fs.createWriteStream(outputPathVercel); // a ruta de vercel
        pdfDoc.pipe(writeStream);
        pdfDoc.end();
        
        // Esperar a que termine de escribir
        return new Promise((resolve, reject) => {
          writeStream.on('finish', () => {
              //console.log("PDF renuncia guardado exitosamente en local");
              //resolve(outputPathLocal);
              console.log("PDF renuncia guardado exitosamente en Vercel");
              resolve(outputPathVercel);
          });
          
          writeStream.on('error', (err) => {
              console.error("Error al guardar el PDF:", err);
              reject(err);
          });
        });

    } catch (error) {
        console.error('Error en la generación de renuncia:', error);
        throw error;
    }
};

module.exports =  renunciaResponsabilidad;

