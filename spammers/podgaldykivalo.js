module.exports.addPodgaldykivaloSpammer = function (bot) {

    bot.onText(/бот в тему/, msg => {
        bot.sendMessage(msg.chat.id, 'Я всегда в тему')
    })
}

