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

            return `👑 Текущие данные по коронавирусу: 
            Страны с больными: ${totalCountries}
            Всего заболело: ${totalIll}
            Всего умерло: ${totalDeath}`;
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
