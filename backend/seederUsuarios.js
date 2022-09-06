const usuario = require('./models/usuario')
const cee = require('./models/cee')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

let user1 = new usuario({
    nombre: "Ignacio",
    apellido: "Gonzalez",
    email: "ignacio@ieci.cl",
    password: "password",
    rol: "admin",
    estadoCuenta: "regular",
    carrera: "ieci"
})
let user2 = new usuario({
    nombre: "Pablo",
    apellido: "Montoya",
    email: "pablo@comercial.cl",
    password: "password",
    rol: "admin",
    estadoCuenta: "regular",
    carrera: "comercial"
})
let user4 = new usuario({
    nombre: "Alejandra",
    apellido: "Segura",
    email: "alejandra@icinf.cl",
    password: "password",
    rol: "admin",
    estadoCuenta: "regular",
    carrera: "icinf"
})
let user5 = new usuario({
    nombre: "Juan",
    apellido: "Soto",
    email: "juan@cpa.cl",
    password: "password",
    rol: "admin",
    estadoCuenta: "regular",
    carrera: "cpa"
})


const creacionUsuarios = async () => {
    await user1.save((err, usuario) => {
        if (err) {
            console.log(err)
        } else {
            cee.updateOne({ carrera: "ieci" }, { $push: { usuarios: usuario._id } }, (err, cee) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(cee)
                }
            })
        }
    })
    await user2.save((err, usuario) => {
        if (err) {
            console.log(err)
        } else {
            cee.updateOne({ carrera: "comercial" }, { $push: { usuarios: usuario._id } }, (err, cee) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(cee)
                }
            })
        }
    })
    await user4.save((user) => {
        cee.updateOne({ carrera: "icinf" }, { $push: { usuarios: user._id } }, (err, res) => {
            if (err) {
                console.log(err)
            }
            console.log("usuario agregado a cee")
        })
    })
    await user5.save((user) => {
        cee.updateOne({ carrera: "cpa" }, { $push: { usuarios: user._id } }, (err, res) => {
            if (err) {
                console.log(err)
            }
            console.log("usuario agregado a cee")
        })
    })

}

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true,
        keepAlive: true,
        poolSize: 10,
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(() => {
        console.log("Connected to MongoDB");
        creacionUsuarios()
    })
