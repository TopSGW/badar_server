import nodemailer from 'nodemailer';
const os = require('os');
import 'dotenv/config'

let transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // user: 'octateamsolution@gmail.com',
        // pass: 'oTs20202020'
    },
    tls: {
        rejectUnauthorized: false
    }
});

export function sendEmail(targetMail, text) {

    let mailOptions = {
        from: `${process.env.APP_NAME}`,
        to: targetMail,
        subject: `${process.env.APP_NAME}`,
        text: text,

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
             console.log(error);
        }
    });


    return true;
}
