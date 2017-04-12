const TelegramBot = require('node-telegram-bot-api');
const DB = require('./db.js').DB

const PORT = 8888                     // do not choose 443
const TELEGRAM_TOKEN = "" //process.env.TELEGRAM_TOKEN // from @botfather
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
    bot.sendMessage(msg.chat.id, message, {parse_mode: 'Markdown'});
    //bot.sendSticker(msg.chat.id, 'CAADAgADjgAD9-dEB5kxDsTvifG3Ag')
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
