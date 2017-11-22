/**
 * Этот спаммер работает с расписанием вадоса - можно сетить рабочий день и отвечает расписанием.
 *
 * Вызываешь эту функцию и передаешь параметром бота - хуки навешиваются - профит
 * 
 * ВЫРУБЛЕН - никто его не юзает
 */
module.exports.addScheduleSpammer = function (bot) {
    const DB = require('./db.js').DB

    let moment = require('moment');
    require('moment-recur'); //https://github.com/c-trimm/moment-recur
    moment.locale('ru');

    // Парсим строку в обьект moment
    //dd-mm-yyyy or dd-mm
    function parseStringToMoment(msg_time) {
        let [day, month, year] = msg_time.split('-')
        if (!year) {
            // entered without year
            year = moment().year()
        }
        return moment(`${year}-${month}-${day}`)
    }

    // Функция считает расписание на 30 дней вперед по обьекту moment который нужно передать параметром
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

        // Возвращаем массив дат-строк в правильном порядке
        return formated_schedule
    }

    // ХУКИ!

    // Хук на запрос расписания
    bot.onText(/\вадос.*работает|работает.*вадос/gi, (msg, match) => {
        let work_date = DB.get_work_date().then(work_date => {
            if (work_date == 'NO_DATE') {
                bot.sendMessage(msg.chat.id, `Я не знаю когда у вадоса выходной. Добавь последний день работы через /workdate dd-mm-yyyy`);
                return
            }
            
            //Если в базе дата есть - можем считать расписание
            const last_working_day = parseStringToMoment(work_date)
            let leisure_schedule = prepareLeisureSchedule(last_working_day)
            let schedule_as_string = leisure_schedule.join(`- `)

            let message = ''
            for (let date of leisure_schedule) {
                message = message + `*${date}*\n\r`
            }
            bot.sendMessage(msg.chat.id, `Вадос выходной: `);
            bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
        })

    });

    // Хук на вайп базы
    bot.onText(/\/clear/, (msg, match) => {
        console.info('Got clear command:', msg)
        DB.clear().then(() => {
            bot.sendMessage(msg.chat.id, `Все почищено!`)
        })
    })

    // Хук на запись рабочего дня
    bot.onText(/\/workdate (.*)|\/workdate/, (msg, match) => {
        // Проверяем формат
        if (match[1] && moment(parseStringToMoment(match[1])).isValid()) {
            DB.set_work_date(match[1])
            bot.sendMessage(msg.chat.id, `Записал, ${match[1]}`);
        } else {
            bot.sendMessage(msg.chat.id, `Ты втираешь мне дичь ${match[1]} должно быть в формате dd-mm-yyyy`);
        }
    })

}