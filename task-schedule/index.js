const schedule = require('node-schedule');
const mailer = require('../helper/mailer')

module.exports = () => {
    schedule.scheduleJob('*/5 * * * * *', function(){
        try {
            // mailer.sendMail('mai.vv@neo-lab.vn', 'Chào bạn chúc bạn một ngày vui vẻ!', "<h1>Chào bạn chúc bạn một ngày vui vẻ!</h1>")
            console.log('send mail success')
        } catch (error) {
            console.log(error)
        }
    });
}