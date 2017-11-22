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

    // Currencies are optional, regex to support both - /rates and /rates BTC USD
    bot.onText(/\/rates( (.+) (.+))?/, async (msg, match) => {
        let firstCurrency = match[2]
        let secondCurrency = match[3]
        if (!firstCurrency) {
            firstCurrency = 'BTC'
        }
        if (!secondCurrency) {
            secondCurrency = 'USD'
        }
        try {
            const formattedRates = await requestExchangeRate(firstCurrency, secondCurrency)
            bot.sendMessage(msg.chat.id, formattedRates)
        } catch (err) {
            bot.sendMessage(msg.chat.id, `Что-то упало, вот ошибка - ${err}`)
        }
    })
}

