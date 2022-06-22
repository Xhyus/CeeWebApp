const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

const isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorizacion' })
    }
    let secretToken = null
    if (req.params.carrera == 'ieci') {
        secretToken = process.env.SECRET_TOKEN_IECI
    }
    if (req.params.carrera == 'ica') {
        secretToken = process.env.SECRET_TOKEN_ICA
    }
    if (req.params.carrera == 'comercial') {
        secretToken = process.env.SECRET_TOKEN_COMERCIAL
    }
    if (req.params.carrera == 'icinf') {
        secretToken = process.env.SECRET_TOKEN_ICINF
    }
    const token = req.headers.authorization.split(" ")[1]
    try {
        console.log(secretToken)
        const payload = jwt.decode(token, secretToken)
        if (payload.exp < moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado' })
        }
        req.user = payload.sub
    } catch (err) {
        return res.status(401).send({ message: 'El token no es valido' })
    }
    next()
}

module.exports = { isAuth };