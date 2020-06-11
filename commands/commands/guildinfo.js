const Discord = require("discord.js");

module.exports = {
  name: "guildinfo",
  category: "Moderation",
  description: "Lists the information about the guild you're in.",
  aliases: ["serverinfo"],
  cooldown: 5,
  guildOnly: "true",
  execute(bot, message, args) {
    const guild = message.guild;

    let vccount = 0;
    let textcount = 0;
    guild.channels.cache.map(c => {
      if (c.type === "text") {
        textcount += 1;
      } else if (c.type === "voice") {
        vccount += 1;
      }
    });

    let usercount = 0;
    let botcount = 0;
    guild.members.cache.map(m => {
      if (m.user.bot === true) {
        botcount += 1;
      } else {
        usercount += 1;
      }
    });

    let guildEmbed = new Discord.MessageEmbed()
      .setTitle(`**${guild.name}**`)
      .setThumbnail(guild.iconURL())
      .setFooter("Requested by " + message.author.tag, message.author.avatarURL())
      .setColor("PURPLE")
      .addField(
        "Guild Owner",
        `${guild.owner.user.username}#${guild.owner.user.discriminator}`
      )
      .addField("Guild Create Date", guild.createdAt)
      .addField("Member Count", `Users: ${usercount}, Bots: ${botcount}`, true)
      .addField("Channel Count", `Text: ${textcount}, VC: ${vccount}`, true)
      .addField("Role Count", guild.roles.cache.size)
      .addField("Emoji Count", guild.emojis.cache.size);

    message.channel.send(guildEmbed);
  }
};
