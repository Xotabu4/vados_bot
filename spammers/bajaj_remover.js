
module.exports.addBajajRemover = function (bot) {
    bot.onText(/убей байай|убей bajaj|bajaj/gi, (msg, match) => {
        if(msg.reply_to_message.message_id) {
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id)
            bot.sendMessage(msg.chat.id, 'BAJAJ уничтожен')
        } else {
            bot.sendMessage(msg.chat.id, 'Чтобы уничтожить bajaj - сделай реплай на сообщение с словами - убей байай|убей bajaj|bajaj ')
        }
    })
}

