let moment = require('moment-timezone')

module.exports.addTimezoneSpammer = function (bot) {
    bot.onText(/\/time?/, async (msg, match) => {
        let kievTime = moment.tz(moment(), 'Europe/Kiev').format('MMMM D  H:mm:ss')
        let baliTime = moment.tz(moment(), 'Asia/Makassar').format('MMMM D  H:mm:ss')
        bot.sendMessage(msg.chat.id, 
`
В Киеве : ${kievTime}
На Бали: ${baliTime}
`)    
    })
}