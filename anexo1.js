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


//añadir total, inicial, cuotas
async function anexo1(name, email, dir1, dir2, num, fechasArray, numCuotas, valorCuotas, pagoTotal, pagoInicial) {

    const fechaNumeros = fechasArray[2];

    function generarFechasMensuales(fechaNumeros, numCuotas) {
        const [mm, dd, aaaa] = fechaNumeros.split('/').map(Number);
        const fechaInicio = new Date(aaaa, mm - 1, dd); 
        const fechas = [];
    
        for (let i = 1; i <= numCuotas; i++) {
            const fecha = new Date(fechaInicio);
            fecha.setMonth(fecha.getMonth() + i); // Añadir i meses
            
            const nuevoMM = String(fecha.getMonth() + 1).padStart(2, '0');
            const nuevoDD = String(dd).padStart(2, '0'); // Mantener el día original
            const nuevoAAAA = fecha.getFullYear();
            
            fechas.push(`${nuevoMM}/${nuevoDD}/${nuevoAAAA}`);
        }
    
        return fechas;
    }
    const fechasCuotas = generarFechasMensuales(fechaNumeros, numCuotas);
    const cuotas = [];
    for (let index = 0; index < numCuotas; index++) {
        const cuota = { cuota: index+1, fecha: fechasCuotas[index], valor: Number(valorCuotas)};
        cuotas.push(cuota);
    };
    //{ cuota: 1, fecha: '01/01/2024', valor: 500}  formato

    

    try {
        // crear instancia de pdf make
        const printer = new pdfmake(fonts);

        // definir contenido del documento
        const docDefinition = {

            // Definir los márgenes de la página: [izquierda, arriba, derecha, abajo]
            pageMargins: [70, 120, 70, 120],

            header: {
                columns: [
                    { 
                    width: '*',
                    text: [ {text: "MIGRACION LATINA LLC\n", fontSize: 11},
                        "110 S Hartford Ave. Suite 2532\nTulsa, OK 74120\n(918) 212 - 0327\ncontacto@migracionlatina.com\nwww.migracionlatina.com",
                    ], 
                    alignment: 'left',
                    fontSize: 9,
                    margin: [70, 40, 0, 40]
                    },
                    {
                    image: 'public/images/ImagenML.jpg',
                    width: 70,
                    alignment: 'right',
                    margin: [0, 30, 35, 40]
                    },
                ],
            },

            content: [

                {
                    text: "ANEXO 1\nESQUEMA DE PAGO",
                    alignment: 'center',
                    bold: true,
                    fontSize: 18,
                    margin: [0, 10, 0, 40]
                },
                {
                    columns: [
                        {
                        text: [ 
                            {text: `${name}\n`, bold:true},
                            {text: `${dir1}\n${dir2}\n${num}`},
                            ],
                        width: '*',
                        lineHeight: 1.2,
                        alignment: 'left',
                        margin: [0, 0, 0, 20]
                        },
                        { 
                        width: 'auto', 
                        text: [ {text: "Fecha:", bold:true}, `${fechasArray[2]}`],
                        alignment: 'right',
                        margin: [0, 0, 0, 20]
                        }
                    ]  
                },
                {
                    text: "Especificaciones",
                    alignment: 'center',
                    bold: true,
                    fontSize: 16,
                    margin: [0, 0, 0, 20]                    
                },
                {
                    text: ["A continuación, nos permitimos emitir el esquema de pago por concepto de ",
                        {text: "SOLICITUD DE ASILO", bold: true},
                        ", por valor de ",
                        {text: `${pagoTotal}`, bold: true},
                        " dólares, con un pago inicial de ",
                        {text: `${pagoInicial}`, bold: true},
                        "dólares, y su respectivo saldo distribuidos en cuotas mensuales como se relaciona a continuación:"
                    ],
                    alignment: 'justify',
                    margin: [0, 0, 0, 20]                    
                },   

                // Tabla
                {
                    style: 'tableExample',
                    table: {
                        widths: [100, 180, '*'],
                        body: [
                            // header
                            [
                            {text: 'CUOTAS', bold: true, alignment: 'left'}, 
                            {text: "FECHA", bold: true, alignment: 'left'}, 
                            {text: 'VALOR', bold: true, alignment: 'left'}
                            ],
                            [
                            {text: 'PAGO INICIAL', bold: true, alignment: 'left'}, 
                            {text: `${fechasArray[2]}`, alignment: 'left'}, 
                            {text: `${pagoInicial}`, alignment: 'left'}
                            ],                            
                            ...cuotas.map(cuota => [
                                { text: `${cuota.cuota.toString()}`, bold: true}, // Columna 1
                                cuota.fecha,            // Columna 2
                                `$${cuota.valor.toFixed(2)}` // Columna 3 (formato USD)
                            ]),
                            [{text: 'TOTAL', alignment: 'right', colSpan: 2, bold: true},'',{text: `${pagoTotal}`, bold: true}],
                        ]
                    }
                },  
                {text: "****NOTAS", bold: true, margin: [0,0,0,20]},   

                // parrafos
                {
                    ol: [
  
                      // 1
                      { text: ["Cabe anotar que este esquema de pago ", 
                        { text: "NO TIENE INCLUIDO EL VALOR DE LAS TRADUCIONES ", bold: true }, 
                        'que al ser aceptadas por el cliente deben ser canceladas el 50% en el momento de la radicación del proceso y el otro 50% se difiere en el número de cuotas que queden pendientes por pago.',
                        ],
                        counter: 1,
                        margin: [20,0,0,20],
                        alignment: 'justify'
                      },
                      // 2
                      { text: ["Si el cliente realiza el pago después de las fechas establecidas y/o acordadas, se cobrará ", 
                        { text: "$100.00 dólares a manera de penalidad ", bold: true }, 
                        'cargado a su cuota pendiente.', 
                        ],
                        counter: 2, 
                        margin: [20,0,0,30],
                        alignment: 'justify'
                      },                  
                    ],
                }, 

                // End
                {text: "Cualquier duda o inquietud que tenga sobre este tema por favor permítanos conocerla para poder resolverla.\n\n\nCordialmente;", margin: [0,0,0,20]},                                          

                {
                    text:"EQUIPO FINANCIERO MIGRACION LATINA\nfinancial.manager@migracionlatina.com\nPhone        (918) 212 0327\nWhatsApp (918) 213 8636",
                    bold: true,
                    margin: [0,0,0,20]
                },
                {text: "Aceptado;", margin: [0,0,0,50]},

                // firma
                {
                text: '.                                                      ',
                margin: [0, 0, 0, 2],
                decoration: 'underline',
                },
                {
                text: name,
                bold: true,
                margin: [0, 0, 0, 1]
                },
                {
                text: dir1,
                bold: true,
                margin: [0, 0, 0, 1]
                },
                {
                text: dir2,
                bold: true,
                margin: [0, 0, 0, 1]
                },
                {
                text: num,
                bold: true,
                margin: [0, 0, 0, 1]
                },
                {
                text: email,
                bold: true,
                margin: [0, 0, 0, 50]
                },
                {
                text: '.                                                      ',
                margin: [0, 0, 0, 2],
                decoration: 'underline',
                },
                {
                text: 'MIGRACION LATINA',
                bold: true,
                margin: [0, 0, 0, 1]
                },
                {
                text: 'Alejandra Holcomb',
                bold: true,
                margin: [0, 0, 0, 1]
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
                  lineHeight: 1.6
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

        console.log("pdf Anexo 1 creado en memoria listo para guardar")

        // ruta de almacenamiento y nombre
        //const outputPathLocal = path.join(__dirname, 'tmp', `EsquemaDePago${cleanName}.pdf`); // ruta de Guardado en /tmp/ de local
        const outputPathVercel = `/tmp/EsquemaDePago${cleanName}.pdf`; // ruta de Guardado en /tmp/ de vercel

        // usa pipe para escribir el archivo 
        //const writeStream = fs.createWriteStream(outputPathLocal);
        const writeStream = fs.createWriteStream(outputPathVercel); // a ruta de vercel
        pdfDoc.pipe(writeStream);
        pdfDoc.end();
        
        // Esperar a que termine de escribir
        return new Promise((resolve, reject) => {
          writeStream.on('finish', () => {
              //console.log("PDF EsquemaDePago guardado exitosamente en local");
              //resolve(outputPathLocal);
              console.log("PDF EsquemaDePago guardado exitosamente en Vercel");
              resolve(outputPathVercel);
          });
          
          writeStream.on('error', (err) => {
              console.error("Error al guardar el PDF EsquemaDePago:", err);
              reject(err);
          });
        });        
        
    } catch (error) {
        console.error('Error en la generación del EsquemaDePago:', error);
        throw error;
    }
};

module.exports = anexo1;