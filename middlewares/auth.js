const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

const isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorizacion' })
    }
    try {
        const payload = jwt.decode(req.headers.authorization.split(" ")[1], process.env.SECRET_TOKEN)
        if (payload.exp < moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado', error: "token expirado" })
        }
        req.user = payload.sub
    } catch (err) {
        return res.status(401).send({ message: 'El token no es valido', error: "token invalido" })
    }
    next()
}

module.exports = { isAuth };