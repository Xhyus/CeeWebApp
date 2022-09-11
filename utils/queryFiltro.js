const queryFiltro = (filtros) => {
    let query = ''
    if (filtros.estado) {
        query = `estado=${filtros.estado}`
    }
    if (filtros.tipoAsamblea && filtros.estado) {
        query = `${query}&tipoAsamblea=${filtros.tipoAsamblea}`
    } else {
        if (filtros.tipoAsamblea) {
            query = `tipoAsamblea=${filtros.tipoAsamblea}`
        }
    }
    if (filtros.inicio && (filtros.estado || filtros.tipoAsamblea)) {
        const date = new Date(filtros.inicio)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const fecha = `${month}/${day}/${year}`
        query = `${query}&inicio=${fecha}`
    } else {
        if (filtros.inicio) {
            const date = new Date(filtros.inicio)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const fecha = `${month}/${day}/${year}`
            query = `${query}&inicio=${fecha}`
        }
    }
    if (filtros.fin && (filtros.estado || filtros.tipoAsamblea || filtros.inicio)) {
        const date = new Date(filtros.fin)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const fecha = `${month}/${day}/${year}`
        query = `${query}&fin=${fecha}`
    } else {
        if (filtros.fin) {
            const date = new Date(filtros.fin)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const fecha = `${month}/${day}/${year}`
            query = `${query}&fin=${fecha}`
        }
    }
    return query
}

export default queryFiltro