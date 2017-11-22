/**
 * Мета-информация о боте
 */

module.exports.addStatusSpammer = function (bot) {
    bot.onText(/\/status/, (msg, match) => {
        bot.getWebHookInfo().then(webHookInfo => {


            // Use if needed
            //APP_ID: process.env.HEROKU_APP_ID,
            //APP_NAME: process.env.HEROKU_APP_NAME,
            //HEROKU_DYNO_ID: process.env.HEROKU_DYNO_ID,
            //RELEASE_VESRION: process.env.HEROKU_RELEASE_VERSION,
            // DO NOT use this, it replying with telegram token!
            // WEBHOOK_URL: webHookInfo.url
            const status = `    
RELEASE_CREATED: ${process.env.HEROKU_RELEASE_CREATED_AT}
COMMIT: ${process.env.HEROKU_SLUG_COMMIT}
DESCRIPTION: ${process.env.HEROKU_SLUG_DESCRIPTION}
                
TELEGRAM_STATUS: 
    UPDATES_PENDING: ${webHookInfo.pending_update_count}
    LAST_ERROR_TIME: ${webHookInfo.last_error_date}
    LAST_ERROR_MESSAGE: ${webHookInfo.last_error_message}
`
            bot.sendMessage(msg.chat.id, JSON.stringify(status, undefined, 2))
        })
    })
}