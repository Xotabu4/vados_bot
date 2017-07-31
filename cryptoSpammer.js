let request = require('request-promise');
/**
 * on /rates in chat - doing 2 requests, for ETH and BTC
 * waiting for promises and then formatting prices, and send message to chat
 */
module.exports.addCryptoCurrencySpammer = function (bot) {
    bot.onText(/\/rates/, (msg, match) => {
        Promise.all([request('https://cex.io/api/last_price/BTC/USD'),
        request('https://cex.io/api/last_price/ETH/USD')])
            .then(responses => {
                // Parsing all responces to JSON
                jsones = responses.map(json => JSON.parse(json))

                if (jsones[0].error || jsones[1].error) {
                    throw Error(`${jsones[0].error} : ${jsones[1].error}`)
                }
                const btcPrice = jsones[0].lprice
                const ethPrice = jsones[1].lprice
                console.log('prices', btcPrice, ethPrice)
                let formattedRates = `CEX.IO rates:\r\nBTC/USD - $${btcPrice}\r\nETH/USD - $${ethPrice}`;

                bot.sendMessage(msg.chat.id, formattedRates)
            })
            .catch(function (err) {
                console.error(err)
                bot.sendMessage(msg.chat.id, `Что-то наебнулось, вот ошибка - ${err}`)
            })
    })
}