const handleDates = require('../utils/handleDates');
const nodemailer = require('nodemailer');
const handleUpperCase = require('../utils/handleUppercase');
const dotenv = require('dotenv');
dotenv.config();

const envioCorreo = (req, res) => {
    let { asunto, fecha, contexto, tipoAsamblea, puntos, ubicacion } = req.body;
    let { carrera } = req.params;
    let correo, pass
    console.log(fecha)
    contexto = handleUpperCase(contexto), tipoAsamblea = handleUpperCase(tipoAsamblea), ubicacion = handleUpperCase(ubicacion), asunto = handleUpperCase(asunto), carrera = handleUpperCase(carrera), fecha = handleDates(fecha)
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
        return res.status(400).send({ message: 'Error en el envio de correo' });
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: correo,
            pass: pass
        }
    });
    const mailOptions = {
        from: `Centro de Estudiantes ${carrera} <${correo}>`,
        to: "ignaciogonzalez1609@gmail.com",
        subject: "Asamblea " + tipoAsamblea + " " + carrera + " || " + asunto,
        text: "Hola, te enviamos este correo para informarte que la asamblea ha sido agendada",
        html: `
            <h1>Asamblea ${tipoAsamblea}</h1>
            <p>Esta asamblea se realizara bajo el siguiente contexto:</p>
            <p>${contexto}.</p>
            <p>La fecha de la asamblea es: ${fecha} y nos reuniremos en ${ubicacion}</p>
            <p>Los puntos a conversar en la asamblea seran:</p>
            <ul>
                ${puntos.map(punto => `<li>${punto}</li>`).join('')}
            </ul>
            <p>Saludos</p>
            <p>Centro de Estudiantes ${carrera}</p>
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

module.exports = envioCorreo
