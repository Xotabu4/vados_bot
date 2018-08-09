/**
 * Этот спаммер слушает когда упоминают кого-то и спамит в ответ стикерочком 
 * 
 * Хардкод-хардкодик!
 * 
 * 
 * Вызываешь эту функцию и передаешь параметром бота - хуки навешиваются - профит
 */


module.exports.addStickerSpammer = function (bot) {
    function getRandomStickerID(stickers) {
        return stickers[Math.floor(Math.random() * stickers.length)];
    }

    bot.onText(/вадос|вадим|влад|наштиркувач|пес|пэс/gi, (msg, match) => {
        let stickers = [
            'CAADAgADKQAD9-dEB9dt6-h8-LTwAg', // policeman
            'CAADAgADLQAD9-dEB2SFz6xQwbmsAg', // зайчик
            'CAADAgADMQAD9-dEB37iCmicoOU8Ag', // в очках
            'CAADAgADhwAD9-dEBzz6OrzdsPGVAg', // четкий паца
            'CAADAgADiQAD9-dEBz1kZfPv_4_qAg', // гоп
            'CAADAgADjAAD9-dEB_v4dqeygtURAg', // упоротые упражнения
            'CAADAgADkgAD9-dEB_T30QOVqP5KAg', // язычнык
            'CAADAgADmAAD9-dEB005FL8EYVoaAg', // няша
            'CAADAgADjgAD9-dEB5kxDsTvifG3Ag', // сила
            'CAADAgADkAAD9-dEByRUhToHC_18Ag', // гоп 2
            'CAADAgADlAAD9-dEBwmWkQc7m7c8Ag', // вознесение
            'CAADAgADKQEAAvfnRAeDU-i0bes4PQI', // Телек ломать
            'CAADAgADMgEAAvfnRAem5ZyodCtQ7QI', // Без зубов
            'CAADAgADNgEAAvfnRAfW4650gCpFOwI', // На деньги
            'CAADAgADOQEAAvfnRAc75aERVjGfIwI', // Прицесса 
            'CAADAgADQwEAAvfnRAc6aLsq2576sgI', // Вадосо бомж
            'CAADAgADRgEAAvfnRAdJCQABiAktIj0C', // Ракета
            'CAADAgADLQEAAvfnRAeHa1DcyRFFigI', // Порошок
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/бухал|бухель|вугель|бугель/gi, (msg, match) => {
        let stickers = [
            'CAADAgADNAAD9-dEBy10Egx2zvjKAg', // недовольный бухарь
            'CAADAgADNgAD9-dEBzOv1xV7Nfl2Ag', // палец вверх
            'CAADAgADPgAD9-dEB9ZuOkj4duyBAg', // черт
            'CAADAgADeQAD9-dEB1SBzKwkNOonAg', // чмоки
            'CAADAgADewAD9-dEB99LYOVA7P1PAg', // плохая погода
            'CAADAgADNwEAAvfnRAcJAoJgZEv2PwI', // Барбер
            'CAADAgADRAEAAvfnRAd4yXhsrDwPAwI' // Язык
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    // матчим как слово и когда в конце ничего (конец строки)
    bot.onText(/хот\s|хот$|хотабыч/gi, (msg, match) => {
        let stickers = [
            'CAADAgADYwAD9-dEB6ag9sNqHblsAg', // доказательства от зеленого
            'CAADAgADZQAD9-dEB3XU6mA3LCf2Ag', // панкота
            'CAADAgADGgEAAvfnRAcr2M9FbRnb3wI', // явраю
            'CAADAgADLwEAAvfnRAf2t4qb0qw2TQI', // Блюрохот
            'CAADAgADMAEAAvfnRAcTE58Hnyxz6wI', // Цилиндр
            'CAADAgADMwEAAvfnRAeh3cTNbwnw_QI', // Школяр
            'CAADAgADOwEAAvfnRAelkqjzgL_2_wI', // Носочлен
            'CAADAgADQAEAAvfnRAenX1VbqkYnCwI', // Хакир
            'CAADAgADQgEAAvfnRAduKeTxuqj1hQI' // Скривился
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/явраю/gi, (msg, match) => {
        bot.sendSticker(msg.chat.id, 'CAADAgADGgEAAvfnRAcr2M9FbRnb3wI')
    })

    bot.onText(/кова|ковалева/gi, (msg, match) => {
        let stickers = [
            'CAADAgADZwAD9-dEB8fm-zJm_0EbAg', // ОООО
            'CAADAgADaQAD9-dEB_YJsckeeORpAg', // лукавая
            'CAADAgADawAD9-dEB3MBw5R2rWd2Ag', // ого!
            'CAADAgADNQEAAvfnRAdjWQcXnoxqcAI', // Коварность
            'CAADAgADQQEAAvfnRAeFc-WhnCbivgI' // Недовольная
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/гриця|грицай/gi, (msg, match) => {
        let stickers = [
            'CAADAgADLwAD9-dEB3myk_JRkBEWAg', // цп
            'CAADAgADXQAD9-dEB7VURHOB46UQAg', // гуц гуц
            'CAADAgADXwAD9-dEB96YQlytllOCAg', // пацанчик!
            'CAADAgADYQAD9-dEB9aBL1psNWhHAg', // свин
            'CAADAgADLAEAAvfnRAeQay7FxQbNQQI' // дай обниму
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/паша|павел|равел|павлик|пашка/gi, (msg, match) => {
        let stickers = [
            'CAADAgADcQAD9-dEB1h0NfI-pblTAg', // граф
            'CAADAgADcwAD9-dEB_a2OqPqHLlQAg', // витрищився
            'CAADAgADdQAD9-dEB8nqPgXXXIwpAg', // мерзость но люблю
            'CAADAgADdwAD9-dEBx9w5BfseTGlAg', // булка
            'CAADAgADKwEAAvfnRAcPNJI1zzFgIgI', // Сердце <3
            'CAADAgADOAEAAvfnRAfmncv--Rl8YQI', // Gonna get raped
            'CAADAgADRwEAAvfnRAdh1lLnYMHYxAI' // Матрица
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/вэл|веталь|виталик|кельбас|кила|килла|килбо|килбитс|виталя/gi, (msg, match) => {
        let stickers = [
            'CAADAgADIwAD9-dEB4Kl3hSzlEFYAg', // стильный на фоне
            'CAADAgADJQAD9-dEB0UzcU6kcAUHAg', // прыгает в трусах
            'CAADAgADJwAD9-dEB7vnZ62Va4AvAg', // нежность с бабочкой
            'CAADAgADhQAD9-dEB0SjlKUux4VzAg', // нар и камень
            'CAADAgADJgEAAvfnRAfH8e_RyJDbEwI', // маленький х
            'CAADAgADJwEAAvfnRAefNWcUppXxeQI' // большой х
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/маша|мавлик/gi, (msg, match) => {
        let stickers = [
            'CAADAgADbQAD9-dEBwpDhr5r2cXzAg', // лыба
            'CAADAgADKAEAAvfnRAddmVZJ5gt8TQI', // лежит
            'CAADAgADRQEAAvfnRAdjLNBR0rKCJAI' // Личинка
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/принц|прынц/gi, (msg, match) => {
        let stickers = [
            'CAADAgADKwAD9-dEB8J7pgNdilGKAg', // модник с цыпой
            'CAADAgADOAAD9-dEB8Ft8_xZoz02Ag', // олдовый 2007
            'CAADAgADWAAD9-dEB70TYCv7rDvLAg', // бухарь с пивом
            'CAADAgADKgEAAvfnRAediVcKtVG4HgI', // Гегеге в прыжке
            'CAADAgADLgEAAvfnRAfB6q_sDf4fEAI', // Ангел-принц
            'CAADAgADMQEAAvfnRAeSzTbW7_uflQI' // Хач-араб
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/марина|палундра|полундра/gi, (msg, match) => {
        let stickers = [
            'CAADAgADOgAD9-dEB3IZ-itF-clsAg', // Черная
            'CAADAgADPAAD9-dEBxJm6eIMK-l5Ag', // Винище
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/джунь|іра/gi, (msg, match) => {
        let stickers = [
            'CAADAgAD2AADuHTtDlQosrqUcxUtAg', // matrix очки
            'CAADAgAD1wADuHTtDsAX9D-9NYJ9Ag', // челюсти
            'CAADAgAD2QADuHTtDnDlRd0xhj2AAg', // пырится
            'CAADAgAD2gADuHTtDpU_yesGBVSbAg', // сига недовольная
            'CAADAgAD2wADuHTtDuN_OeUAAuYgAg', // недовольная без сиги
            'CAADAgAD3AADuHTtDoR0bsS2dugMAg', // такие дела без сиги
            'CAADAgAD5wADuHTtDqi1oJCZoxUSAg', // такие дела сига
            'CAADAgAD6AADuHTtDuC-UgABuv4mFwI', // ярость!
        ]
        bot.sendSticker(msg.chat.id, getRandomStickerID(stickers))
    })

    bot.onText(/ты не шаришь|ты просто не шаришь/gi, (msg, match) => {
        bot.sendSticker(msg.chat.id, 'CAADAgADHQAD9-dEB9F-3yZbZGLEAg')
    })
    bot.onText(/бухала подсчетики/gi, (msg, match) => {
        bot.sendSticker(msg.chat.id, 'CAADAgADTAEAAvfnRAeDXxBWZI8TEgI')
    })

}