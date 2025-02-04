const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fontkit = require('@pdf-lib/fontkit')
const fs = require('fs')
const fontBytes = fs.readFileSync('./fonts/ARIALBOLDMT.OTF')

async function AcuerdoServicios(fechaEs, fechaEn, nameClient) {
  const pdfDoc = await PDFDocument.create()

  // cargar la fuente
  pdfDoc.registerFontkit(fontkit);
  const ArialFuente = await pdfDoc.embedFont(fontBytes);

  // Añadir pagina
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 12

  // medidas
  // tamaño del texto alineado a la derecha

  const lineHeight = fontSize * 1.2; // Espaciado entre líneas (20% más que el tamaño de la fuente)
  let yPosition = height - 50; // Posición inicial en la parte superior

  const textWidthEsp = ArialFuente.widthOfTextAtSize(fechaEs, fontSize);
  const textWidthEng = ArialFuente.widthOfTextAtSize(fechaEn, fontSize);
  // margen
  const marginRight = 80;
  const marginLeft = 80;

  // Fechas

  page.drawText(fechaEs, {
    x: width - textWidthEsp - marginRight,
    y: yPosition,
    size: fontSize,
    font: ArialFuente,
    color: rgb(0, 0, 0),
  })
  yPosition -= lineHeight;

  page.drawText(fechaEn, {
    x: width - textWidthEng - marginRight,
    y: yPosition,
    size: fontSize,
    font: ArialFuente,
    color: rgb(0, 0, 0),
  })
  yPosition -= 2*lineHeight;


  // Titulo

  const titulo1 =  "ACUERDO DE SERVICIOS DE INMIGRACIÓN"
  const textWidthtitulo1 = ArialFuente.widthOfTextAtSize(titulo1, fontSize);
  page.drawText(titulo1, {
    x: width/2 - textWidthtitulo1/2,
    y: yPosition,
    size: fontSize,
    font: ArialFuente,
    color: rgb(0, 0, 0),
  })
  page.drawLine({
    start: { x: width/2 - textWidthtitulo1/2, y: yPosition - 2 }, // Línea empieza justo debajo del texto
    end: { x: width/2 - textWidthtitulo1/2 + textWidthtitulo1, y: yPosition - 2 }, // Largo de la línea igual al texto
    thickness: 1, // Grosor de la línea
    color: rgb(0, 0, 0), // Color negro
  });
  yPosition -= lineHeight;

  const titulo2 =  "IMMIGRATION SERVICES AGREEMENT"
  const textWidthtitulo2 = ArialFuente.widthOfTextAtSize(titulo2, fontSize);
  page.drawText(titulo2, {
    x: width/2 - textWidthtitulo2/2,
    y: yPosition,
    size: fontSize,
    font: ArialFuente,
    color: rgb(0, 0, 0),
  })
  page.drawLine({
    start: { x: width/2 - textWidthtitulo2/2, y: yPosition - 2 }, // Línea empieza justo debajo del texto
    end: { x: width/2 - textWidthtitulo2/2 + textWidthtitulo2, y: yPosition - 2 }, // Largo de la línea igual al texto
    thickness: 1, // Grosor de la línea
    color: rgb(0, 0, 0), // Color negro
  });
  yPosition -= 2*lineHeight;

  // NOmbre cliente
  page.drawText(`EL CLIENTE: ${nameClient}`, {
    x: marginLeft,
    y: yPosition,
    size: fontSize,
    font: ArialFuente,
    color: rgb(0, 0, 0),
  })
  yPosition -= lineHeight;

  page.drawText(`THE CLIENT: ${nameClient}`, {
    x: marginLeft,
    y: yPosition,
    size: fontSize,
    font: ArialFuente,
    color: rgb(0, 0, 0),
  })
  yPosition -= lineHeight;




  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync('./output/4.AcuerdodeServicios.pdf', pdfBytes);
}

module.exports = AcuerdoServicios;