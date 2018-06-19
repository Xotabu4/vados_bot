module.exports.addBirthdaySpammer = function (bot) {

    bot.onText(/бот, а ты кову поздравил?/, async (msg, match) => {

        let delayedSay = (message, ms) => {
            setTimeout(() => {
                bot.sendMessage(msg.chat.id, message)
            }, ms)
        }

        let delayedSticker = (id, ms) => {
            setTimeout(() => {
                bot.sendSticker(msg.chat.id, id)
            }, ms)
        }

        delayedSay('ковелова', 1000)
        delayedSay('счастья здоровля', 2000)
        delayedSay('{{ВСТАВЬТЕ СООБЩЕНИЕ ЗДЕСЬ}}', 5000)
        delayedSay('давайте полюбуемся еще раз', 6000)
        let stickers = [
            'CAADAgADZwAD9-dEB8fm-zJm_0EbAg', // ОООО
            'CAADAgADaQAD9-dEB_YJsckeeORpAg', // лукавая
            'CAADAgADawAD9-dEB3MBw5R2rWd2Ag', // ого!
            'CAADAgADNQEAAvfnRAdjWQcXnoxqcAI', // Коварность
            'CAADAgADQQEAAvfnRAeFc-WhnCbivgI' // Недовольная
        ]
        stickers.forEach(sticker => delayedSticker(sticker, 10000))
        delayedSay('ах, наша красоточка', 11000)
    })
}

