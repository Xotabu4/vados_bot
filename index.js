const TelegramBot = require('node-telegram-bot-api');
const DB = require('./db.js').DB

const PORT = 8888                     // do not choose 443
const TELEGRAM_TOKEN = "" //process.env.TELEGRAM_TOKEN // from @botfather
const HOST = "127.0.0.1"               // Example: 127.0.0.1
const DOMAIN = "https://bf27c0cb.ngrok.io"             // mybot.domain.com


const BOT_NAME = '@VadosScheduleBot'
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

//Just logging
// bot.onText(/\.*/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"
//   console.log('#### NEW MESSAGE #####')
//   console.log(msg)
// });

// bot.on('sticker', (msg)=> {
//     const chatId = msg.chat.id;
//     console.log('#### got sticker', msg)
// })

// bot.onText(/\вадос.*выходной|выходной.*вадос/gi, (msg, match) => {
//   const chatId = msg.chat.id;

//   let free_time = DB.get_all_free_times().time
//   console.log('###FREE_TIME ', free_time)
//   bot.sendMessage(chatId, `У вадоса выходные ${free_time}`);
// });

bot.onText(/\вадос.*работает|работает.*вадос/gi, (msg, match) => {
    let work_time = DB.get_all_work_times()
    bot.sendMessage(msg.chat.id, `У вадоса работа ${work_time}`);
    //bot.sendSticker(msg.chat.id, 'CAADAgADjgAD9-dEB5kxDsTvifG3Ag')
});

bot.onText(/\@VadosScheduleBot работает (.*)/, (msg, match) => {
    console.log('## пишем в базу: ', match[1])
    DB.set_work_time(match[1])
    console.log(msg.chat.id, `Записал, вадос работает ${match[1]}`)
    bot.sendMessage(msg.chat.id, `Записал, вадос работает ${match[1]}`);
})

bot.onText(/\@VadosScheduleBot не работает (.*)/, (msg, match) => {
    let cb = () => {
        console.log(msg.chat.id, `Записал, вадос не работает ${match[1]}`)
        bot.sendMessage(msg.chat.id, `Записал, вадос не работает ${match[1]}`);
    }
    DB.del_work_time(match[1])
})

bot.onText(/\@VadosScheduleBot забудь все/, (msg, match) => {
    let reply = () => {
        bot.sendMessage(msg.chat.id, `Все почистил, база пустая`)
    }
    DB.clear(reply)
})