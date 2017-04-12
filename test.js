//msg example:

// let msggggg = { message_id: 5056,
//   from: { id: 121956343, first_name: 'Oleksandr', username: 'xotabu4' },
//   chat: 
//    { id: 121956343,
//      first_name: 'Oleksandr',
//      username: 'xotabu4',
//      type: 'private' },
//   date: 1491999472,
//   text: '/clear',
//   entities: [ { type: 'bot_command', offset: 0, length: 6 } ] }



let moment = require('moment');
require('moment-recur'); //https://github.com/c-trimm/moment-recur
moment.locale('ru');

//dd-mm-yyyy or dd-mm
msg_time = '01-04-2017'
const last_working_day = parseStringToMoment(msg_time)


let leisure_schedule = prepareLeisureSchedule(last_working_day)


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
        console.log(fixed_dots)
        formated_schedule.push(fixed_dots.format("dddd, D MMMM"))
    }
    
    return formated_schedule
}

