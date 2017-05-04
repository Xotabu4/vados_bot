const TelegramBot = require('node-telegram-bot-api');
const DB = require('./db.js').DB

const PORT = 8888                     // do not choose 443
const TELEGRAM_TOKEN = "368081887:AAHtgCxRjPrjVgeuHIqHd8zAOBfdsJT01lI" //process.env.TELEGRAM_TOKEN // from @botfather
const HOST = "127.0.0.1"               // Example: 127.0.0.1
const DOMAIN = "https://bf27c0cb.ngrok.io"             // mybot.domain.com


const BOT_NAME = '@VadosScheduleBot'
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.onText(/\вадос.*работает|работает.*вадос/gi, (msg, match) => {
    console.log('########## MESSAGE RECIEVED!')
    let work_date = DB.get_work_date()
    if (work_date == 'NO_DATE') {
        bot.sendMessage(msg.chat.id, `Я не знаю когда у вадоса выходной. Добавь последний день работы через /workdate dd-mm-yyyy`);
        return
    }

    const last_working_day = parseStringToMoment(work_date)
    let leisure_schedule = prepareLeisureSchedule(last_working_day)
    let schedule_as_string = leisure_schedule.join(`- `)

    let message = ''
    for (let date of leisure_schedule) {
        message = message + `*${date}*\n\r`
    }
    bot.sendMessage(msg.chat.id, `Вадос выходной: `);
    bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
});

bot.onText(/\/clear/, (msg, match) => {
    console.info('Got clear command:', msg)
    DB.clear().then(() => {
        bot.sendMessage(msg.chat.id, `Все почищено!`)
    })
})

bot.onText(/\/workdate (.*)|\/workdate/, (msg, match) => {
    console.log('## пишем в базу: ', match[1])
    if (match[1] && moment(parseStringToMoment(match[1])).isValid()) {
        DB.set_work_date(match[1])
        bot.sendMessage(msg.chat.id, `Записал, ${match[1]}`);
    } else {
        bot.sendMessage(msg.chat.id, `Ты втираешь мне дичь ${match[1]} должно быть в формате dd-mm-yyyy`);
    }
})

//////// STICKERS ON MENTIONS
function getRandomStickerID(stickers) {
    return stickers[Math.floor(Math.random() * stickers.length)];
}


bot.onText(/вадос|вадим|влад|наштиркувач|пес|пэс/gi, (msg, match) => {
    let stickers = [
        'CAADAgADKQAD9-dEB9dt6-h8-LTwAg', // policeman
        'CAADAgADLQAD9-dEB2SFz6xQwbmsAg', // зайчик
        'CAADAgADMQAD9-dEB37iCmicoOU8Ag', // в очках
        'CAADAgADhwAD9-dEBzz6OrzdsPGVAg', // четкий паца
        'CAADAgADiQAD9-dEBz1kZfPv_4_qAg', // гоп
        'CAADAgADjAAD9-dEB_v4dqeygtURAg', // упоротые упражнения
        'CAADAgADkgAD9-dEB_T30QOVqP5KAg', // язычнык
        'CAADAgADmAAD9-dEB005FL8EYVoaAg', // няша
        'CAADAgADjgAD9-dEB5kxDsTvifG3Ag', // сила
        'CAADAgADkAAD9-dEByRUhToHC_18Ag', // гоп 2
        'CAADAgADlAAD9-dEBwmWkQc7m7c8Ag' // вознесение
    ]
    bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
})

bot.onText(/бухал|бухель|вугель|бугель/gi, (msg, match) => {
    let stickers = [
        'CAADAgADNAAD9-dEBy10Egx2zvjKAg', // недовольный бухарь
        'CAADAgADNgAD9-dEBzOv1xV7Nfl2Ag', // палец вверх
        'CAADAgADPgAD9-dEB9ZuOkj4duyBAg', // черт
        'CAADAgADeQAD9-dEB1SBzKwkNOonAg', // чмоки
        'CAADAgADewAD9-dEB99LYOVA7P1PAg', // плохая погода
    ]
    bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
})

bot.onText(/хот |хотабыч/gi, (msg, match) => {
    let stickers = [
        'CAADAgADYwAD9-dEB6ag9sNqHblsAg', // доказательства от зеленого
        'CAADAgADZQAD9-dEB3XU6mA3LCf2Ag', // панкота
        'CAADAgADGgEAAvfnRAcr2M9FbRnb3wI', // явраю
    ]
    bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
})

bot.onText(/явраю/gi, (msg, match) => {
    bot.sendSticker(msg.chat.id, 'CAADAgADGgEAAvfnRAcr2M9FbRnb3wI')
})

bot.onText(/кова|ковалева/gi, (msg, match) => {
    let stickers = [
        'CAADAgADZwAD9-dEB8fm-zJm_0EbAg', // ОООО
        'CAADAgADaQAD9-dEB_YJsckeeORpAg', // лукавая
        'CAADAgADawAD9-dEB3MBw5R2rWd2Ag', // ого!
    ]
    bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
})

bot.onText(/гриця|грицай/gi, (msg, match) => {
    let stickers = [
        'CAADAgADLwAD9-dEB3myk_JRkBEWAg', // цп
        'CAADAgADXQAD9-dEB7VURHOB46UQAg', // гуц гуц
        'CAADAgADXwAD9-dEB96YQlytllOCAg', // пацанчик!
        'CAADAgADYQAD9-dEB9aBL1psNWhHAg' // свин
    ]
    bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
})

bot.onText(/паша|павел|равел|павлик|пашка/gi, (msg, match) => {
    let stickers = [
        'CAADAgADcQAD9-dEB1h0NfI-pblTAg', // граф
        'CAADAgADcwAD9-dEB_a2OqPqHLlQAg', // витрищився
        'CAADAgADdQAD9-dEB8nqPgXXXIwpAg', // мерзость но люблю
        'CAADAgADdwAD9-dEBx9w5BfseTGlAg' // булка
    ]
    bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
})

bot.onText(/вэл|веталь|виталик|кельбас|кила|килла|килбо|килбитс/gi, (msg, match) => {
    let stickers = [
        'CAADAgADIwAD9-dEB4Kl3hSzlEFYAg', // стильный на фоне
        'CAADAgADJQAD9-dEB0UzcU6kcAUHAg', // прыгает в трусах
        'CAADAgADJwAD9-dEB7vnZ62Va4AvAg', // нежность с бабочкой
        'CAADAgADhQAD9-dEB0SjlKUux4VzAg' // нар и камень
    ]
    bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
})

bot.onText(/маша|мавлик/gi, (msg, match) => {
    let stickers = [
        'CAADAgADbQAD9-dEBwpDhr5r2cXzAg', // лыба
    ]
    bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
})

bot.onText(/принц|прынц/gi, (msg, match) => {
    let stickers = [
        'CAADAgADKwAD9-dEB8J7pgNdilGKAg', // модник с цыпой
        'CAADAgADOAAD9-dEB8Ft8_xZoz02Ag', // олдовый 2007
        'CAADAgADWAAD9-dEB70TYCv7rDvLAg' // бухарь с пивом
    ]
    bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
})

bot.onText(/ты не шаришь|ты просто не шаришь/gi, (msg, match) => {
    bot.sendSticker(msg.chat.id, 'CAADAgADHQAD9-dEB9F-3yZbZGLEAg')
})

//////// WORKING WITH TIME!

let moment = require('moment');
require('moment-recur'); //https://github.com/c-trimm/moment-recur
moment.locale('ru');


//msg_time = '01-04-2017'


//dd-mm-yyyy or dd-mm
function parseStringToMoment(msg_time) {
    let [day, month, year] = msg_time.split('-')
    if (!year) {
        // entered without year
        year = moment().year()
    }
    return moment(`${year}-${month}-${day}`)
}

function prepareLeisureSchedule(last_working_day) {
    const first_leisure_day = last_working_day.clone().add(1, 'days')
    const second_leisure_day = first_leisure_day.clone().add(1, 'days')

    // I don't give a fuck about copy/paste
    const leisure_recurrence_1 = first_leisure_day.recur({
        end: first_leisure_day.clone().add(30, 'days')
    }).every(5).days().all("L")

    const leisure_recurrence_2 = second_leisure_day.recur({
        end: second_leisure_day.clone().add(30, 'days')
    }).every(5).days().all("L")

    let schedule = []

    // Still dont give a fuck
    for (let i = 0; i < leisure_recurrence_1.length; i++) {

        schedule.push(leisure_recurrence_1[i])
        schedule.push(leisure_recurrence_2[i])

    }
    let formated_schedule = []
    for (let date of schedule) {
        // For some reason recurence lib replaces - with . and changes year position.
        let fixed_dots = parseStringToMoment(date.replace(/\./g, '-'))
        formated_schedule.push(fixed_dots.format("dddd, D MMMM"))
    }

    return formated_schedule
}
