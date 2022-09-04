import compareAsc from 'date-fns/compareAsc'

const formateoFecha = (fecha) => {
    let newDate = fecha.split('T')[0].split('-');
    let anio = newDate[0]
    let mes = newDate[1]
    let dia = newDate[2]
    let fechaFormateada = `${dia}/${mes}/${anio}`
    let newHora = fecha.split('T')
    let hora = newHora[1]
    let horaFormateada = hora.split(':')
    let horaFinal = `${horaFormateada[0]}:${horaFormateada[1]}`
    let estado
    if (compareAsc(fecha, new Date()) === 1) {
        estado = "Terminadas"
    } else {
        estado = "PorRealizar"
    }
    let format = {
        fecha: fechaFormateada,
        hora: horaFinal,
        estado: estado
    }
    return format

}


const validarCalendario = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    let yyyy = today.getFullYear();
    let th = today.getHours();
    let m = today.getMinutes();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (th < 10) {
        th = '0' + th
    }
    if (m < 10) {
        m = '0' + m
    }
    today = yyyy + '-' + mm + '-' + dd + 'T' + th + ':' + m;
    document.getElementById("fecha").min = today;
}

module.exports = {
    formateoFecha,
    validarCalendario
}