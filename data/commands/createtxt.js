const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;

module.exports.run = (client, message, args, data, game, announcement, colors) => {
message.channel.send('This command has moved. Please use the `txt` command.')
}
module.exports.help = {
    name: "createtxt",
    info: "Creates a text file",
    usage: "createtxt <text>"
}