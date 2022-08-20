const transporter = require('../services/nodemailer');
const handleDates = require('../utils/handleDates');
const handleUpperCase = require('../utils/handleUppercase');

const mailSender = async (asunto, fecha, contexto, tipoAsamblea, puntos, carrera) => {
    let contextoAsamblea = handleUpperCase(contexto);
    let tipoAsambleaFormateado = handleUpperCase(tipoAsamblea);
    await transporter.sendMail({
        from: `Centro de Estudiantes ${carrera} <${process.env.MAIL}>`,
        to: "ignaciogonzalez1609@gmail.com",
        subject: "Asamblea " + tipoAsambleaFormateado + " " + carrera + " || " + asunto,
        text: "Hola, te enviamos este correo para informarte que la asamblea ha sido agendada",
        html: `
            <h1>Asamblea ${tipoAsambleaFormateado}</h1>
        <p?>Esta asamblea es de tipo ${tipoAsambleaFormateado} y se realizara bajo el contexto de:</p>
        <p>${contextoAsamblea}.</p>
        <p>La fecha de la asamblea es: ${fecha}</p>
        <p>Los puntos a considerar son:</p>
        <ul>
            ${puntos.map(punto => `<li>${punto.asunto}</li>`).join('')}
        </ul>
        <p>Saludos</p>
        <p>Centro de Estudiantes ${carrera}</p>
        `
    })
}

module.exports = mailSender;