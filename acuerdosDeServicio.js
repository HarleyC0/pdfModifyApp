const pdfmake = require('pdfmake');
const fs = require('fs');
const path = require('path');
const { text } = require('stream/consumers');
const { type } = require('os');

// Configurar las fuentes
const fonts = {
    Arial: {
        normal: path.join(__dirname, 'public/fonts/02587_ARIALMT.ttf'),
        bold: path.join(__dirname, 'public/fonts/ARIALBOLDMT.OTF'),
        italics: path.join(__dirname, 'public/fonts/2248-font.ttf'), // Bold Italic
        bolditalics: path.join(__dirname, 'public/fonts/02587_ARIALMT.ttf')
    }
};

// Exportar la función que genera y guarda el PDF
async function acuerdosDeServicio(fechaEs, name, dir1, dir2, num, email) {

    try {  
        // crear instancia de pdf make
        const printer = new pdfmake(fonts);
        const marginParrafos = [0, 0, 0, 25];

        // definir contenido del documento
        const docDefinition = {

            // Definir los márgenes de la página: [izquierda, arriba, derecha, abajo]
            pageMargins: [70, 120, 70, 120],

            header: 
            {
              image: 'public/images/ImagenML.jpg',
              width: 80,
              alignment: 'center',
              margin: [0, 25, 0, 0]
            },

            footer: {
              columns: [
                { width: '*', text: '' }, 
                { 
                  width: 'auto', 
                  text: "110 S Hartford Ave. Suite 2532\nTulsa, OK 74120\n+1 (918) 212 - 0327\nWhatsApp +1 (539) 525 - 1561\nMigración Latina LLC\nwww.migracionlatina.com",
                  alignment: 'center',
                  fontSize: 8,
                  margin: [0, 25, 0, 0]
                },
                { 
                  width: '*', 
                  text: '______ iniciales', 
                  alignment: 'right', 
                  fontSize: 8, 
                  margin: [0, 45, 45, 0] 
                }
              ]
            },

            content: [

                // Titulos
                { 
                  text: `${fechaEs}`, 
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 0]
                },
                { 
                  text: `${fechaEs}`, 
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 30]
                },
                { 
                  text: `ACUERDO DE SERVICIOS DE INMIGRACIÓN`, 
                  bold: true,
                  alignment: 'center',
                  decoration: 'underline',
                  margin: [0, 0, 0, 0]
                },
                { 
                  text: `IMMIGRATION SERVICES AGREEMENT`, 
                  bold: true,
                  alignment: 'center',
                  decoration: 'underline',
                  margin: [0, 0, 0, 25]
                },
                { 
                  text: `EL CLIENTE: ${name}`, 
                  bold: true,
                  alignment: 'left',
                  margin: [0, 0, 0, 0]
                },
                { 
                  text: `THE CLIENT: ${name}`, 
                  bold: true,
                  alignment: 'left',
                  margin: [0, 0, 0, 15]
                },
                { 
                  text: `Servicio a Prestar: ASILO`, 
                  bold: true,
                  alignment: 'left',
                  margin: [0, 0, 0, 0]
                },
                { 
                  text: `Service to Render: ASYLUM`, 
                  bold: true,
                  alignment: 'left',
                  margin: [0, 0, 0, 15]
                },
                { 
                  text: `Beneficiarios: Nombres APELLIDOS - Parentesco`, 
                  bold: true,
                  alignment: 'left',
                  margin: [0, 0, 0, 0]
                },
                { 
                  text: `Beneficiary: Nombres APELLIDOS - Relationship`, 
                  bold: true,
                  alignment: 'left',
                  margin: [0, 0, 0, 30]
                },

                // Cuerpo
                { 
                  text: ["De conformidad con la declaración y representación completa y honesta por parte de ",
                  { text: "EL CLIENTE, ", italics: true },
                  "éste acuerda contratar los servicios de Migración Latina LLC para que actúe y hable en su nombre en el presente proceso." 
                  ],
                alignment: 'justify',
                margin: [0, 0, 0, 15]
                },
                { 
                  text: ["Pursuant to the complete and honest representation and statement made by ",
                  { text: "THE CLIENT, THE CLIENT ", italics: true },
                  "agrees to engage the services of Migracion Latina LLC to act and speak on its behalf in these proceedings." 
                  ],
                alignment: 'justify',
                margin: [0, 0, 0, 20]
                },
                {
                  ol: [

                    // 1
                    { text: ["_____", { text: "EL CLIENTE, ", italics: true }, 'entiende que este Contrato obliga a Migración Latina LLC a proveer una representación honesta, profesional y de acuerdo con la ley. Migración Latina LLC garantiza que utilizará toda su experiencia, honestidad y conocimiento con el fin de obtener un resultado positivo que beneficie a ', { text: "EL CLIENTE.", italics: true }],
                      counter: 1,
                      margin: marginParrafos,
                      alignment: 'justify'
                    },
                    { text: ["_____", { text: "THE CLIENT, ", italics: true }, ' understands that this Contract obligates Migracion Latina LLC to provide honest, professional representation in accordance with the law. Migracion Latina LLC guarantees that it will use all its experience, honesty and knowledge in order to obtain a positive result that benefits ', { text: "THE CLIENT.", italics: true }],
                      counter: 1, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },

                    // 2
                    { text: ["_____", { text: "EL CLIENTE ", italics: true }, 
                      'acuerda pagar por esta representación la suma de ',
                      { text: `$X,XXX.00`, bold: true },
                      ' USD a Migración Latina LLC, los cuales no serán reembolsables. En ese sentido, ',
                      { text: `EL CLIENTE`, bold: true },
                      'se compromete a pagar de la siguiente manera (Anexo I. Esquema de Pagos):'
                      ],
                      counter: 2, 
                      margin: [0, 0, 0, 20],
                      alignment: 'justify'
                    },
                    { 
                      type: 'lower-alpha',
                        ol: [
                            { text: [
                                "Un pago inicial de ", 
                                { text: `$X,XXX.00 `, bold: true}, 
                                "USD el día ", 
                                { text:`XX/XX/202X.`, bold: true}
                                ],
                              counter: 1, 
                              margin: [20, 0, 0, 5],
                              alignment: 'justify'
                            },
                            { text: [
                                { text: `XX `, bold: true},
                                "cuotas de ", 
                                { text: `$XXX.00 `, bold: true}, 
                                "USD cada una que serán canceladas consecutivamente los ", 
                                { text:`XX `, bold: true},
                                "de cada mes, con fecha final de pago en ",
                                {text: `XX/XX/202X.`, bold: true}
                                ],
                              counter: 2, 
                              margin: [20, 0, 0, 20],
                              alignment: 'justify'
                            },
                        ],
                    },
                    { type: 'none',
                      ol: [
                        { text: ["Si", { text: "EL CLIENTE ", italics: true }, 
                          'hace su pago mensual después de la fecha convenida en este ',
                          { text: `Contrato`, bold: true },
                          ', se le cobrará ',
                          { text: `$100.00 `, bold: true },
                          'USD a manera de penalidad cargado a su pago pendiente. De igual manera se cargará a la cuenta de ',
                          { text: `El CLIENTE`, italics: true },
                          'la suma de ',
                          { text: `$50.00 `, bold: true },
                          'USD en el caso de que haya un cheque devuelto.'
                          ],
                          margin: [-30, 0, 0, 25],
                          alignment: 'justify',
                        },
                      ],
                    },
                    { text: ["_____", { text: "THE CLIENT ", italics: true }, 
                      'agrees to pay for this representation the sum of ',
                      { text: `$X,XXX.00`, bold: true },
                      ' USD to Migracion Latina LLC, which will not be refundable. In this regard, ',
                      { text: "THE CLIENT ", bold: true },
                      'agrees to pay as follows (Annex I. Payment Schedule):'
                      ],
                      counter: 2, 
                      margin: [0, 0, 0, 20],
                      alignment: 'justify'
                    },
                    { 
                      type: 'lower-alpha',
                        ol: [
                            { text: [
                                "An initial payment of ", 
                                { text: `$X,XXX.00 `, bold: true}, 
                                "USD on ", 
                                { text:`XX/XX/202X.`, bold: true}
                                ],
                              counter: 1, 
                              margin: [20, 0, 0, 5],
                              alignment: 'justify'
                            },
                            { text: [
                                { text: `XX `, bold: true},
                                "installments of ", 
                                { text: `$XXX.00 `, bold: true}, 
                                "USD each to be paid consecutively on the ", 
                                { text:`XX `, bold: true},
                                "of each month with final date of payment on ",
                                {text: `XX/XX/202X.`, bold: true}
                                ],
                              counter: 2, 
                              margin: [20, 0, 0, 20],
                              alignment: 'justify'
                            },
                        ],
                    },
                    { type: 'none',
                      ol: [
                        { text: ["If", { text: "THE CLIENT ", italics: true }, 
                          'makes his monthly payment after the date agreed upon in this ',
                          { text: `Contract`, bold: true },
                          ', he will be charged ',
                          { text: `$100.00 `, bold: true },
                          'USD as a penalty charged to his pending payment. ',
                          { text: `THE CLIENT'S `, italics: true },
                          'account will also be charged the sum of ',
                          { text: `$50.00 `, bold: true },
                          'USD in the event of a returned check.'
                          ],
                          margin: [-30, 0, 0, 25],
                          alignment: 'justify',
                        },
                      ],
                    },

                    // 3
                    { text: ["_____", 
                      'Los costos incluyen llenar las formas necesarias para su proceso, el correo certificado, fotocopias, papelería, llamadas fuera del país, fax o cualquier otro gasto administrativo.'
                      ],
                      counter: 3, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },
                    { text: ["_____", 
                      'The costs include filling out the necessary forms for processing, certified mail, photocopies, stationery, out-of-country calls, fax or any other administrative expenses.'
                      ],
                      counter: 3, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },

                    // 4
                    { text: ["_____", { text: "EL CLIENTE ", italics: true }, 
                      'entiende que si los honorarios no son pagados como ha sido estipulado en el punto DOS (2) de este mismo ',
                      { text: `Contrato`, bold: true },
                      ', Migración Latina LLC no está obligado a continuar trabajando en su proceso; pero, en cambio sí está en la obligación y facultad de hacer efectivo el Pagaré que ',
                      { text: `EL CLIENTE `, italics: true },
                      'ha firmado junto con este', {text: "Contrato", bold: true}, 'asumiendo los costos adicionales que el Cobro Jurídico de la obligación adquirida con Migración Latina LLC impliquen.'
                      ],
                      counter: 4, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },
                    { text: ["_____", { text: "THE CLIENT ", italics: true }, 
                      'understands that if the fees are not paid as stipulated in point TWO (2) of this ',
                      { text: `Contract`, bold: true },
                      ', Migracion Latina LLC is not obliged to continue working in its process; but, instead it is in the obligation and power to make effective the Promissory Note that ',
                      { text: `THE CLIENT `, italics: true },
                      'has signed along with this', {text: "Contract", bold: true}, 'assuming the additional costs that the Legal Collection of the obligation acquired with Migracion Latina LLC implies.'
                      ],
                      counter: 4, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },

                    // 5
                    { text: ["_____",
                      'Migración Latina LLC acepta mantener a ',
                      { text: `EL CLIENTE `, italics: true },
                      'informado del estado en que se encuentra el proceso enviando copia de cualquier información relevante para su solicitud.',
                      ],
                      counter: 5, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },
                    { text: ["_____",
                      'Migracion Latina LLC agrees to keep ',
                      { text: `THE CLIENT `, italics: true },
                      'informed of the status of the process by sending a copy of any information relevant to his/her application.',
                      ],
                      counter: 5, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                    

                    // 6
                    { text: ["_____", { text: "EL CLIENTE ", italics: true }, 
                      'promete a Migración Latina LLC ser sincero todo el tiempo y acepta dar pronto aviso sobre cualquier hecho relevante a su solicitud. Adicionalmente, ',
                      { text: "EL CLIENTE ", italics: true },
                      'acepta proporcionar a Migración Latina LLC todos los cambios de dirección, empleador, estado civil, número de celular, casa y/o trabajo o cualquier otra información que afecte de manera directa o indirecta su proceso.',
                      ],
                      counter: 6, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },   
                    { text: ["_____", { text: "THE CLIENT ", italics: true }, 
                      'CLIENT promises to Migracion Latina LLC to be truthful at all times and agrees to give prompt notice of any facts relevant to his/her application. Additionally, ',
                      { text: "THE CLIENT ", italics: true },
                      'agrees to provide Migracion Latina LLC with all changes of address, employer, marital status, mobile phone number, home and/or work or any other information that directly or indirectly affects his/her process.',
                      ],
                      counter: 6, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                                     

                    // 7
                    { text: ["_____", "Si algún documento necesita ser traducido al Inglés; o, ",
                      { text: "EL CLIENTE ", italics: true }, 
                      'necesita de un intérprete durante su proceso, ',
                      { text: "EL CLIENTE ", italics: true },
                      'debe pagar por las traducciones que sean necesarias para su caso al igual que por el intérprete cada vez que lo requiera.',
                      ],
                      counter: 7, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                     
                    { text: ["_____", "If any document needs to be translated into English; or, ",
                      { text: "THE CLIENT ", italics: true }, 
                      'needs an interpreter during the process, ',
                      { text: "THE CLIENT ", italics: true },
                      'must pay for the translations that are necessary for his/her case as well as for the interpreter each time he/she requires it.',
                      ],
                      counter: 7, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    }, 

                    // 8
                    { text: ["_____", "Si ",
                      { text: "EL CLIENTE ", italics: true }, 
                      'necesita visitar un terapeuta, psicólogo, psiquiatra, obtener exámenes médicos, obtener pruebas de algún tipo, necesitara en una entrevista la presencia de un testigo, experto o autoridad; o, cumplir con cualquier requisito adicional; o, solicita la compañía del abogado o un empleado de Migración Latina LLC, los costos que esto implique serán responsabilidad del ',
                      { text: "EL CLIENTE.", italics: true },
                      ],
                      counter: 8, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },    
                    { text: ["_____", "If ",
                      { text: "THE CLIENT ", italics: true }, 
                      'needs to visit a therapist, psychologist, psychiatrist, obtain medical examinations, obtain tests of any kind, need in an interview the presence of a witness, expert or authority; or, comply with any additional requirement; or request the company of the lawyer or an employee of Migracion Latina LLC, the costs involved will be the responsibility of ',
                      { text: "THE CLIENT.", italics: true },
                      ],
                      counter: 8, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                                           

                    // 9
                    { text: ["_____",
                      { text: "EL CLIENTE ", italics: true }, 
                      'entiende que no hay ningún tipo de garantía en lo concerniente a la Leyes de Inmigración de los Estados Unidos y que ningún caso está exento de conllevar un riesgo; y, que cualquier negación puede tener como resultado una deportación o remoción del país.',
                      ],
                      counter: 9, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                     
                    { text: ["_____",
                      { text: "THE CLIENT ", italics: true }, 
                      'understands that there is no guarantee of any kind concerning U.S. Immigration Law and that no case is without risk; and, that any rejection may result in deportation or removal from the country.',
                      ],
                      counter: 9, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    }, 

                    // 10
                    { text: ["_____",
                      { text: "EL CLIENTE ", italics: true }, 
                      'entiende que Migración Latina LLC no hace ninguna promesa o garantiza el resultado de este proceso o cualquier otro asunto legal ya que quien puede tomar una decisión real, definitiva y efectiva en su caso son las autoridades migratorias de los Estados Unidos. Es decir, que las decisiones finales que se tomen en su caso estarán sujetas a discreción por parte de los oficiales, jueces o cualquier otra autoridad migratoria de los Estados Unidos.',
                      ],
                      counter: 10, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                     
                    { text: ["_____",
                      { text: "THE CLIENT ", italics: true }, 
                      'CLIENT understands that Migracion Latina LLC does not make any promise or guarantee to the outcome of this process or any other legal matter since the one who can make a real, final and effective decision in your case are the immigration authorities of the United States. For the avoidance of doubt, the final decisions made in your case will be subject to the discretion of the officers, judges or any other immigration authority of the United States.',
                      ],
                      counter: 10, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                     

                    // 11
                    { text: ["_____", "Cualquier trabajo específicamente delineado en este ",
                      { text: "Contrato", bold: true }, 
                      'no requiere de recursos o fondos adicionales. Los honorarios no excederán la suma anteriormente referida a menos de que ocurran complicaciones inesperadas o trabajos adicionales por lo cual honorarios adicionales serán acordados antes del inicio de ese “nuevo” proceso o antes de la representación. Los honorarios pagados solo cubren la representación por el proceso objeto de este ',
                      { text: "Contrato; ", bold: true },
                      'si el proceso pasa a otra instancia o una apelación es requerida, estos nuevos honorarios serán acordados previamente con ',
                      { text: "EL CLIENTE.", italics: true}
                      ],
                      counter: 11, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    }, 
                    { text: ["_____", "Any work specifically outlined in this ",
                      { text: "Contract", bold: true }, 
                      'does not require additional resources or funds. Fees will not exceed the above amount unless there are unexpected complications or additional work for which additional fees would be agreed prior to the commencement of such "new" proceedings or prior to representation. The fees paid only cover the representation for the process which is the subject of this ',
                      { text: "Contract; ", bold: true },
                      'if the process moves to another instance or an appeal is required, these new fees will be agreed in advance with ',
                      { text: "THE CLIENT.", italics: true}
                      ],
                      counter: 11, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                                       

                    // 12
                    { text: ["_____",
                      { text: "EL CLIENTE ", italics: true }, 
                      'entiende que los paralegales, consultores y asesores o cualquier otra persona vinculada con Migración Latina LLC, quienes claramente han afirmado y puesto en conocimiento ',
                      { text: "DEL CLIENTE ", italics: true }, "que", {text: "no somos abogados, ", bold: true},
                      'no pueden proporcionar asesoramiento legal. Solo prestaran apoyo y proporcionarán información concerniente a su proceso, llenar las formas de inmigración, traducciones necesarias, coordinar las actividades administrativas del caso, coordinar al intérprete (en caso de ser necesario), preparar a ',
                      { text: "EL CLIENTE ", italics: true},
                      "para las entrevistas (en caso de ser necesario) y todo lo indispensable con el objetivo de obtener un resultado positivo en su caso.",
                      ],
                      counter: 12, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },
                    { text: ["_____",
                      { text: "THE CLIENT ", italics: true }, 
                      'understands that paralegals, internal and external consultants and advisors and any other person associated with Migracion Latina LLC, who have clearly stated and made known to ',
                      { text: "THE CLIENT ", italics: true }, "que", {text: "no somos abogados, ", bold: true},
                      'that they are not attorneys, cannot provide legal advice. They will only provide support and information concerning your process, filling out immigration forms, necessary translations, coordinating administrative activities of the case, coordinating the interpreter (if necessary), preparing ',
                      { text: "THE CLIENT ", italics: true},
                      "for interviews (if necessary) and everything indispensable in order to obtain a positive outcome in your case.",
                      ],
                      counter: 12, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                                        

                    // 13
                    { text: ["_____",
                      { text: "EL CLIENTE ", italics: true }, 
                      'está de acuerdo que no existe ningún otro acuerdo y solamente existe este ',
                      { text: "Contrato, ", bold: true },
                      'el cual se hará efectivo en el momento que es firmado y los pagos se han iniciado tal y como se ha indicado en el punto DOS (2) de este mismo ',
                      { text: "Contrato.", bold: true },
                      ],
                      counter: 13, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },
                    { text: ["_____",
                      { text: "THE CLIENT ", italics: true }, 
                      'agrees that no other agreement exists and only this ',
                      { text: "Contract ", bold: true },
                      'exists, which will become effective the moment it is signed, and payments have been initiated as indicated in point TWO (2) of this ',
                      { text: "Contract.", bold: true },
                      ],
                      counter: 13, 
                      margin: marginParrafos,
                      alignment: 'justify'
                    },                                           


                  ],
                  margin: [30, 0, 0, 20]
                },

                // Firma
                {
                  text: "Aceptado;",
                  margin: [0, 0, 0, 10],
                },
                {
                  text: "Acknowledged and accepted;",
                  margin: [0, 0, 0, 70],
                },
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

        console.log("pdf Acuerdos de Servicio creado en memoria listo para guardar")

        // ruta de almacenamiento y nombre
        //const outputPathLocal = path.join(__dirname, 'tmp', `AcuerdosDeServicio${cleanName}.pdf`); // ruta de Guardado en /tmp/ de local
        const outputPathVercel = `/tmp/Pagare${cleanName}.pdf`; // ruta de Guardado en /tmp/ de vercel

        // usa pipe para escribir el archivo 
        //const writeStream = fs.createWriteStream(outputPathLocal);
        const writeStream = fs.createWriteStream(outputPathVercel); // a ruta de vercel
        pdfDoc.pipe(writeStream);
        pdfDoc.end();
        
        // Esperar a que termine de escribir
        return new Promise((resolve, reject) => {
          writeStream.on('finish', () => {
              //console.log("PDF Acuerdos de Servicio guardado exitosamente en local");
              //resolve(outputPathLocal);
              console.log("PDF Acuerdos de Servicio guardado exitosamente en Vercel");
              resolve(outputPathVercel);
          });
          
          writeStream.on('error', (err) => {
              console.error("Error al guardar el PDF Acuerdos de Servicio:", err);
              reject(err);
          });
        });

    } catch (error) {
        console.error('Error en la generación del pagaré:', error);
        throw error;
    }
};


module.exports = acuerdosDeServicio;
