let request = require('request-promise');

module.exports.addBTCExchangeRateSpammer = function (bot) {
    bot.onText(/\/btc/, (msg, match) => {
        request('https://cex.io/api/last_price/BTC/USD')
            .then(function (json) {
                let parsed = JSON.parse(json)
                if(parsed.error) {
                    throw Error(parsed.error)
                }
                bot.sendMessage(msg.chat.id, `BTC/USD - ${parsed.lprice}`)
            })
            .catch(function (err) {
                console.error(err)
                bot.sendMessage(msg.chat.id, `Что-то наебнулось, вот ошибка - ${err}`)
            });
    })

}