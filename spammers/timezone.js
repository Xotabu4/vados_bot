let moment = require('moment-timezone')

module.exports.addTimezoneSpammer = function (bot) {
    bot.onText(/\/time?/, async (msg, match) => {
        let kievTime = moment.tz(moment(), 'Europe/Kiev').format('MMMM D  H:mm:ss')
        let californiaTime = moment.tz(moment(), 'America/Los_Angeles').format('MMMM D  H:mm:ss')
        bot.sendMessage(msg.chat.id,
`
В Киеве : ${kievTime}
В Калифорнии: ${californiaTime}
`)
    })
}