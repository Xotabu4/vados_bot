const request = require("request-promise");

/**
 * On /virus in chat - returning total number of infected and died
 */
module.exports.addCoronaVirusSpammer = function(bot) {
    function requestCoronaVirusStats() {
        return request(`https://coronavirus.zone/data.json`).then(response => {
            let array = JSON.parse(response);

            let totalIll = array
                .map(reg => reg.cases)
                .reduce((p, c) => parseInt(p) + parseInt(c));
            let totalDeath = array
                .map(reg => reg.death)
                .reduce((p, c) => parseInt(p) + parseInt(c));
            let totalCountries = array.length;

            let ukraine = array.find(country => country.region == 'Ukraine')
            let ukraineIll = ukraine.cases;
            let ukraineDeath = ukraine.death

            return `👑 Текущие данные по коронавирусу: 

            В 🇺🇦 заболело: ${ukraineIll} 
            В 🇺🇦 умерло: ${ukraineDeath}

            Страны с больными: ${totalCountries}
            Всего заболело: ${totalIll}
            Всего умерло: ${totalDeath}

            https://coronavirus.zone/`;
        });
    }

    bot.onText(/\/virus?/, async (msg, match) => {
        try {
            const formatedd = await requestCoronaVirusStats();
            bot.sendMessage(msg.chat.id, formatedd);
        } catch (err) {
            bot.sendMessage(msg.chat.id, `Что-то упало, вот ошибка - ${err}`);
        }
    });
};
