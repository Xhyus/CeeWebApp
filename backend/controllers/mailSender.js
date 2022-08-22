const handleDates = require('../utils/handleDates');
const nodemailer = require('nodemailer');
const handleUpperCase = require('../utils/handleUppercase');
const dotenv = require('dotenv');
dotenv.config();

const envioCorreo = (req, res) => {
    let formatedData = handleInfo(req.body.asunto, req.body.fecha, req.body.contexto, req.body.tipoAsamblea, req.body.puntos, req.body.url, req.body.ubicacion, req.params.carrera);
    let credenciales = handleMail(formatedData.carrera);
    if (credenciales == "error") {
        return res.status(400).send({ message: "Error al enviar correo" })
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: credenciales.correo,
            pass: credenciales.pass
        }
    });
    const mailOptions = {
        from: `Centro de Estudiantes ${formatedData.carrera} <${formatedData.correo}>`,
        to: "ignaciogonzalez1609@gmail.com",
        subject: "Asamblea " + formatedData.tipoAsamblea + " " + formatedData.carrera + " || " + formatedData.asunto,
        text: "Hola, te enviamos este correo para informarte que la asamblea ha sido agendada",
        html: `
            <h1>Asamblea ${formatedData.tipoAsamblea}</h1>
            <p>Esta asamblea se realizara bajo el siguiente contexto:</p>
            <p>${formatedData.contexto}.</p>
            <p>La fecha de la asamblea es: ${formatedData.fecha} y nos reuniremos en ${formatedData.ubicacion}</p>
            <p>Los puntos a conversar en la asamblea seran:</p>
            <ul>
                ${formatedData.puntos.map(punto => `<li>${punto}</li>`).join('')}
            </ul>
            <p>Saludos</p>
            <p>Centro de Estudiantes ${formatedData.carrera}</p>
        `
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(400).send({ message: 'Error en el envio de correo' });
        }
        return res.status(200).send({ message: 'Correo enviado' });
    })

    transporter.verify().then(() => {
        console.log('Servidor de correos listo');
    }).catch(err => {
        console.log("Error utilizar servidor de correos");
    })
}

const handleInfo = (asunto, fecha, contexto, tipoAsamblea, puntos, url, ubicacion, carrera) => {
    asunto = handleUpperCase(asunto), tipoAsamblea = handleUpperCase(tipoAsamblea), ubicacion = handleUpperCase(ubicacion), carrera = handleUpperCase(carrera), fecha = handleDates(fecha)
    if (url) {
        return {
            asunto,
            fecha,
            contexto,
            tipoAsamblea,
            puntos,
            ubicacion,
            url,
            carrera
        }
    }
    return {
        asunto,
        fecha,
        contexto,
        tipoAsamblea,
        puntos,
        ubicacion,
        carrera
    }
}


const handleMail = (carrera) => {
    let correo, pass
    if (carrera == 'Ieci') {
        correo = process.env.MAIL_IECI;
        pass = process.env.PASS_IECI;
    } else if (carrera == 'Comercial') {
        correo = process.env.MAIL_ICO;
        pass = process.env.PASS_ICO;
    } else if (carrera == 'Cpa') {
        correo = process.env.MAIL_CPA;
        pass = process.env.PASS_CPA;
    } else if (carrera == 'Icinf') {
        correo = process.env.MAIL_ICINF;
        pass = process.env.PASS_ICINF;
    } else {
        return "error"
    }
    return { correo, pass }
}

module.exports = envioCorreo
