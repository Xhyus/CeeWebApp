const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
        carrera: user.carrera,
        rol: user.rol,
        estadoCuenta: user.estadoCuenta
    }
    // if (user.rol == 'admin') {
    //     return jwt.encode(payload, process.env.SECRET_TOKEN_ADMIN)
    // }
    // if (user.rol == 'secretaria') {
    //     return jwt.encode(payload, process.env.SECRET_TOKEN_SECRETARIA)
    // }
    if (user.carrera == 'ieci') {
        return jwt.encode(payload, process.env.SECRET_TOKEN_IECI)
    }
    if (user.carrera == 'cpa') {
        return jwt.encode(payload, process.env.SECRET_TOKEN_ICA)
    }
    if (user.carrera == 'comercial') {
        return jwt.encode(payload, process.env.SECRET_TOKEN_COMERCIAL)
    }
    if (user.carrera == 'icinf') {
        return jwt.encode(payload, process.env.SECRET_TOKEN_ICINF)
    }
    // return jwt.encode(payload, process.env.SECRET_TOKEN)

}

module.exports = { createToken };