const validar = (regex, valor) => {
    return regex.test(valor);
}

module.exports = {
    validar
}