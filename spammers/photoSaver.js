const db = require('../db.js').DB

module.exports.addPhotoSaverSpammer = function (bot) {
    bot.on('photo', async (message, match) => {
        let biggest_resolution = message.photo.reduce((acum, next) => {
            return ((next.width * next.height) > (acum.width * acum.height)) ? next : acum
        })
        await bot.sendMessage(message.from.id, '!!! BETA TESTING !!!')
        await bot.sendMessage(message.from.id, 'Привет, ты фоточку тут отправлял: ')
        await bot.sendPhoto(message.from.id, biggest_resolution.file_id)
        await bot.sendMessage(message.from.id, `Чуть мета-информации: ${JSON.stringify(biggest_resolution)}`)

        //db.uploadImage(BLOB_HERE)

        await bot.sendMessage(message.from.id, `Хочешь сохранить в безопасный клауд?`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'ДА', callback_data: biggest_resolution.file_id }],
                        [{ text: 'НЕТ', callback_data: 'NO_SAVE' }],
                    ]
                },
            })
        bot.on('callback_query', function (msg) {
            if (msg.data == 'NO_SAVE') {
                bot.sendMessage(msg.from.id, 'Ну нет, так нет');
            } else {
                let imageUrl = await bot.getFileLink(msg.data)
                bot.sendMessage(msg.from.id, `Есть ссылка: ${imageUrl}! ✅`);
            }
        })
    })



}