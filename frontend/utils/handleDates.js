
const compararFechas = (fecha, ahora) => {
    let fechaBD = fecha.split('T')
    let fechaBD2 = fechaBD[0].split('-')
    let fechaBD3 = fechaBD2[2] + '/' + fechaBD2[1] + '/' + fechaBD2[0]
    let horaBD = fechaBD[1].split(':')
    let horaBD2 = horaBD[0] + ':' + horaBD[1]
    let fechaBD4 = new Date(fechaBD3 + ' ' + horaBD2)
    let fechaBD5 = fechaBD4.getTime()
    let ahora2 = ahora.getTime()
    if (fechaBD5 < ahora2) {
        return true
    } else {
        return false
    }
}

const formateoFechaBD = (fecha) => {
    let fechaBD = fecha.split('T')
    let fechaBD2 = fechaBD[0].split('-')
    let fechaBD3 = fechaBD2[2] + '/' + fechaBD2[1] + '/' + fechaBD2[0]
    let horaBD = fechaBD[1].split(':')
    let horaBD2 = horaBD[0] + ':' + horaBD[1]
    let formateado = {
        fecha: fechaBD3,
        hora: horaBD2
    }
    return formateado

}

const validarCalendario = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    var th = today.getHours();
    var m = today.getMinutes();


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
    compararFechas,
    formateoFechaBD
}