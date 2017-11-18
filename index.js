const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN

const BOT_NAME = '@VadosScheduleBot'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TELEGRAM_TOKEN, {
    polling: true,
    //onlyFirstMatch: true
});

// https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md
// https://github.com/yagop/node-telegram-bot-api/blob/release/doc/usage.md#events


require('./scheduleSpammer.js').addScheduleSpammer(bot)
require('./stickerSpammer.js').addStickerSpammer(bot)
require('./cryptoSpammer.js').addCryptoCurrencySpammer(bot)

// Sending message to myself
bot.sendMessage(121956343, `My master, i am started at ${new Date()}`)