const handleDates = (fecha) => {
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

module.exports = handleDates