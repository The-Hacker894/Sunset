const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
module.exports.run = (client, message, args, data, announcement) => {
    message.channel.startTyping()
    var balMember = message.guild.member(message.mentions.users.first());
    const modlog = message.guild.channels.find('name', 'mod-log');
    fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) {
        if (exists) {
            fs.unlink(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`)
            var cleared = new Discord.RichEmbed()
                .setColor(data.embedcolor)
                .setTitle('Cleared Bank File')
                message.channel.send({embed: cleared})
        } else {
            var nobankfile = new Discord.RichEmbed()
                .setColor(data.embedcolor)
                .setTitle('You do not have a Bank File')
                message.channel.send({embed: nobankfile})
        }
    });
    fs.exists(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, function(exists) {
        if (exists) {
            fs.unlink(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`)
            var cleared = new Discord.RichEmbed()
                .setColor(data.embedcolor)
                .setTitle('Cleared ATM File')
                message.channel.send({embed: cleared})
        } else {
            return;
        }
    });
}
module.exports.help = {
    name: "clearmoney",
    usage: "clearmoney",
    info: "Clear your balance and become a hobo"
}