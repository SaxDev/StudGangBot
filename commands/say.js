const Discord = require("discord.js");

module.exports = {
  name: "say",
  category: "Utility",
  description: "Make the bot say your favourite quotes.",
  usage: "[channel(optional)] [quote]",
  cooldown: 5,
  reqPermissions: ["KICK_MEMBERS"],
  execute(bot, message, args) {
    const regex = /<#\d{18}>/g
    if (!args[0]) {
      return message.channel.send(":x: | You need a quote to type in!")
    } else if (regex.test(args[0])) {
      const channel = message.mentions.channels.first()
      const channelarg = args.shift()
      const quote = args.join(" ");
      
      if (quote.length < 1 || quote.length > 512) return message.channel.send(":x: | The quote must be in rage of 1 to 512 characters.");
      channel.send(quote).then(() => message.channel.send(`Quote message has been sent.`).then(m => m.delete({timeout: 2500})))
      message.delete({ timeout: 2500, reason: `Quote message: ${quote}` });
    } else {
      const quote = args.join(" ");
      
      if (quote.length < 1 || quote.length > 512) return message.channel.send(":x: | The quote must be in rage of 1 to 512 characters.");
      message.channel.send(quote);
      message.delete({reason: `Quote message: ${quote}` });
    } 
  }
};
