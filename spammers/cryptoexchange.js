const request = require('request-promise');
/**
 * On /rates in chat - doing 2 requests, for ETH and BTC
 * waiting for promises and then formatting prices, and send message to chat
 */

// Matches /echo [whatever]
// bot.onText(/\/echo (.+)/, function onEchoText(msg, match) {
//     const resp = match[1];
//     bot.sendMessage(msg.chat.id, resp);
//   }); 
module.exports.addCryptoCurrencySpammer = function (bot) {
    function requestExchangeRate(from, to) {
        return request(`https://cex.io/api/last_price/${from}/${to}`)
            .then(response => {
                json = JSON.parse(response)
                if (json.error) {
                    throw Error(`${json.error}`)
                }
                return `CEX.IO rates:\r\n${from}/${to} - ${json.lprice}`;
            })
    }


    bot.onText(/\/rates/, async (msg, match) => {
        try {
            const formattedRates = await requestExchangeRate('BTC', 'USD')
            bot.sendMessage(msg.chat.id, formattedRates)
        } catch (err) {
            bot.sendMessage(msg.chat.id, `Что-то упало, вот ошибка - ${err}`)
        }
    })

    bot.onText(/\/rates (.+) (.+)/, async (msg, match) => {
        if (!match[1] && !match[2]) {
            return
        }
        try {
            const formattedRates = await requestExchangeRate(match[1], match[2])
            bot.sendMessage(msg.chat.id, formattedRates)
        } catch (err) {
            bot.sendMessage(msg.chat.id, `Что-то упало, вот ошибка - ${err}`)
        }
    })
}

