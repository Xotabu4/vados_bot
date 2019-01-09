function encode(stringToOreo) {
  const decodeSymbols = ["o", "re"];
  const encoded = Array.from(stringToOreo)
    .map(each => each.charCodeAt(0).toString(2))
    .map(byteCode => {
      return Array.from(byteCode.toString())
        .map(c => decodeSymbols[c])
        .join("");
    })
    .join(" ");
  return encoded;
}

function decode(stringFromOreo) {
  const decodedBinary = stringFromOreo.replace(/re/g, 1).replace(/o/g, 0);
  const decoded = decodedBinary
    .split(" ")
    .map(bin => parseInt(bin, 2))
    .map(bin => bin.toString(10))
    .map(charcode => String.fromCharCode(charcode))
    .join("");

  return decoded;
}

module.exports.addOreoSpammer = function(bot) {
  // Currencies are optional, regex to support both - /rates and /rates BTC USD
  bot.onText(/\/oreo (.*)?/, async (msg, match) => {
    const stringToOreo = match[2];

    if (!stringToOreo) {
      bot.sendMessage(msg.chat.id, "Не могу сделать OREO из " + match);
    }
    try {
      const encoded = encode(stringToOreo);
      bot.sendMessage(msg.chat.id, encoded);
    } catch (err) {
      bot.sendMessage(msg.chat.id, `Что-то упало, вот ошибка - ${err}`);
    }
  });

  bot.onText(/\/fromOreo (.*)?/, async (msg, match) => {
    const stringFromOreo = match[2];

    if (!stringFromOreo) {
      bot.sendMessage(msg.chat.id, "Не могу сделать текст из " + match);
    }
    try {
      const decoded = decode(stringFromOreo);
      bot.sendMessage(msg.chat.id, decoded);
    } catch (err) {
      bot.sendMessage(msg.chat.id, `Что-то упало, вот ошибка - ${err}`);
    }
  });
};
