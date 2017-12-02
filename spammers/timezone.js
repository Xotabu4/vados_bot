let moment = require('moment-timezone')

let zonesMapping = {
    'bali': "Asia/Makassar",
    'рай': "Asia/Makassar",
    'kiev': 'Europe/Kiev',
    'kyiv': 'Europe/Kiev',
    'киев': 'Europe/Kiev'
}

module.exports.addTimezoneSpammer = function (bot) {
    bot.onText(/\/time (.+)?/, async (msg, match) => {
        let city = match[1].toLowerCase()
        let mapped = zonesMapping[city]
        if(!mapped) {
            for (let zone of moment.tz.names()) {
                if(zone.toLowerCase().includes(city)) {
                    mapped = zone
                }
            }
        }
        try {
            let currenttime = moment.tz(moment(), mapped).format('MMMM D H:mm:ss')
            bot.sendMessage(msg.chat.id, `В ${city} (${mapped}) : ${currenttime}`)
        } catch (error) {
            bot.sendMessage(msg.chat.id, `ERROR: ${JSON.stringify(error)}`)
        }        
    })
}