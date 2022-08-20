const handleDates = (fecha) => {
    let fechaFormateada = new Date(fecha);
    let dia = fechaFormateada.getDate();
    let mes = fechaFormateada.getMonth() + 1;
    let anio = fechaFormateada.getFullYear();
    let hora = fechaFormateada.getHours()
    let minutos = fechaFormateada.getMinutes();
    let segundos = fechaFormateada.getSeconds();
    fechaFormateada = `${dia}-${mes}-${anio} a las ${addZeroBefore(hora)}:${addZeroBefore(minutos)}:${addZeroBefore(segundos)}`;
    return fechaFormateada;
}
const addZeroBefore = (n) => {
    return (n < 10 ? '0' : '') + n;
}

module.exports = handleDates