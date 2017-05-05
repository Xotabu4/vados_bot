const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = require('./token.json').TELEGRAM_TOKEN

const BOT_NAME = '@VadosScheduleBot'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });


require('./scheduleSpammer.js').addScheduleSpammer(bot)
require('./stickerSpammer.js').addStickerSpammer(bot)