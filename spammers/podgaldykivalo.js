module.exports.addPodgaldykivaloSpammer = function (bot) {

    bot.onText(/бот в тему/, async (msg, match) => {
        bot.sendMessage(msg.chat.id, 'Я всегда в тему')
    })
}

