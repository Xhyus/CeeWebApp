const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: `${process.env.MAIL}`,
        pass: `${process.env.MAILPW}`
    }
});

transporter.verify().then(() => {
    console.log('Servidor de correos listo');
}).catch(err => {
    console.log("Error utilizar servidor de correos");
})

module.exports = transporter