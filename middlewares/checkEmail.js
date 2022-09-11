const User = require("../models/usuario");

const checkEmail = (req, res, next) => {
    const email = req.body.email;
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: err });
        }
        if (user) {
            return res.status(400).send({ message: "El correo ya existe" });
        }
        next();
    })
}

module.exports = checkEmail;