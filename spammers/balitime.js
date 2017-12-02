let moment = require('moment-timezone')

module.exports.addBaliTimeSpammer = function (bot) {

    bot.onText(/\/balitime?/, async (msg, match) => {
        let currenttime = moment.tz(moment(), "Asia/Makassar").format('MMMM D H:mm:ss')
        
        bot.sendMessage(msg.chat.id, `Сейчас в раю - ${currenttime}`)
    })
}