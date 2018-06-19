module.exports.addBirthdaySpammer = function (bot) {

    bot.onText(/бот, когда у ковы днюха?/, async (msg, match) => {

        let delayedSay = (message, ms) => {
            setTimeout(() => {
                bot.sendMessage(msg.chat.id, message)
            }, ms)
        }

        delayedSay('19 июля', 1000)
        delayedSay('Это ж сегодня', 2000)
        delayedSay('==================', 5000)
        delayedSay('ОГО поздравляю счастья здоровля', 6000)
        [
            'CAADAgADZwAD9-dEB8fm-zJm_0EbAg', // ОООО
            'CAADAgADaQAD9-dEB_YJsckeeORpAg', // лукавая
            'CAADAgADawAD9-dEB3MBw5R2rWd2Ag', // ого!
            'CAADAgADNQEAAvfnRAdjWQcXnoxqcAI', // Коварность
            'CAADAgADQQEAAvfnRAeFc-WhnCbivgI' // Недовольная
        ].forEach(sticker => delayedSay(sticker, 10000))
        delayedSay('==================', 11000)
    })
}

