const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
        carrera: user.carrera,
    }
    return jwt.encode(payload, process.env.SECRET_TOKEN)
}

module.exports = { createToken };