
module.exports.addBajajRemover = function (bot) {
    bot.onText(/убей байай|убей bajaj/gi, (msg, match) => {
        if (msg.reply_to_message) {
            Promise.all([
                bot.deleteMessage(msg.chat.id, msg.message_id),
                bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id)
            ]).catch(err => {
                bot.sendMessage(msg.chat.id, err.message)
            })
        } else {
            bot.sendMessage(msg.chat.id, 'Чтобы уничтожить bajaj - сделай реплай на сообщение с словами - убей байай|убей bajaj ')
        }
    })
}

