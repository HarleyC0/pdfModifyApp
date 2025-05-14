function formatofecha(fecha) {
    const partes = fecha.split('/');
    const mes = parseInt(partes[0], 10);
    const dia = parseInt(partes[1], 10);
    const anio = parseInt(partes[2], 10);

    const nombresMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];    

    const nombreMesEs = nombresMeses[mes-1]
    const nombreMesEn = monthNames[mes-1]
    const fechaCuotas = dia

    const fechasArray = [`${nombreMesEs} ${dia} ${anio}`, `${nombreMesEn} ${dia} ${anio}`, fecha, fechaCuotas] // [Español, ingles, numeros]

    return fechasArray;
}

module.exports = formatofecha;