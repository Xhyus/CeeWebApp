const usuario = require('./models/usuario')
const cee = require('./models/cee')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

let cee1 = new cee({
    carrera: "ieci",
    asambleas: [],
    rendiciones: [],
    usuarios: []
})
let cee2 = new cee({
    carrera: "comercial",
    asambleas: [],
    rendiciones: [],
    usuarios: []
})
let cee3 = new cee({
    carrera: "icinf",
    asambleas: [],
    rendiciones: [],
    usuarios: []
})
let cee4 = new cee({
    carrera: "cpa",
    asambleas: [],
    rendiciones: [],
    usuarios: []
})


const creacionCEEs = () => {
    cee1.save((err, cee) => {
        if (err) {
            console.log(err)
        } else {
            console.log(cee)
        }
    })

    cee2.save((err, cee) => {
        if (err) {
            console.log(err)
        } else {
            console.log(cee)
        }
    })
    cee3.save((err, cee) => {
        if (err) {
            console.log(err)
        } else {
            console.log(cee)
        }
    })
    cee4.save((err, cee) => {
        if (err) {
            console.log(err)
        } else {
            console.log(cee)
        }
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
        creacionCEEs()
    })
