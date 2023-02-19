const nodeMailer = require('nodemailer')
const sendMail = async (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: false,
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD
        }
    })
    const options = {
        from: process.env.MAILER_FROM,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transporter.sendMail(options)
}
module.exports = {
    sendMail: sendMail
}