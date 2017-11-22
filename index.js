const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const BOT_NAME = '@VadosScheduleBot'

const options = {
    webHook: {
        // Port to which you should bind is assigned to $PORT variable
        // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
        port: process.env.PORT
        // you do NOT need to set up certificates since Heroku provides
        // the SSL certs already (https://<app-name>.herokuapp.com)
        // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
    }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://vados-bot.herokuapp.com:443';
const bot = new TelegramBot(TELEGRAM_TOKEN, options);

// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TELEGRAM_TOKEN}`);

//require('./spammers/schedule.js').addScheduleSpammer(bot)
require('./spammers/stickers.js').addStickerSpammer(bot)
require('./spammers/cryptoexchange.js').addCryptoCurrencySpammer(bot)
require('./spammers/status.js').addStatusSpammer(bot)

// Sending message to myself on start
bot.sendMessage(121956343, `My master, i am started at ${new Date()}`)
