const schedule = require('node-schedule');
const mailer = require('../helper/mailer')
const fs = require("fs")
const handlebars = require("handlebars")

const emailTemplateSource = fs.readFileSync("resources/email/template.hbs", "utf8")
const template = handlebars.compile(emailTemplateSource)
const htmlToSend = template({
    message: "Hello World!",
    hehe: "HEHE",
})


module.exports = () => {
    schedule.scheduleJob('* * * * * *', async function() {
        try {
            // await mailer.sendMail('mai.vv@neo-lab.vn', 'hehee', htmlToSend)
            // console.log('send mail success')
        } catch (error) {
            console.log(error)
        }
    });
}