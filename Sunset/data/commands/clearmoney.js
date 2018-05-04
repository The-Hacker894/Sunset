const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
module.exports.run = (client, message, args, data, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
    var balMember = message.guild.member(message.mentions.users.first());
    const modlog = message.guild.channels.find('name', 'mod-log');
    fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) {
        if (exists) {
            fs.unlink(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`)
            var cleared = new Discord.RichEmbed()
                .setColor(colors.success)
                .setTitle('Cleared Bank File')
                message.channel.send({embed: cleared})
        } else {
            var nobankfile = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('You do not have a Bank File')
                message.channel.send({embed: nobankfile})
        }
    });
    fs.exists(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, function(exists) {
        if (exists) {
            fs.unlink(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`)
            var cleared = new Discord.RichEmbed()
                .setColor(colors.success)
                .setTitle('Cleared ATM File')
                message.channel.send({embed: cleared})
        } else {
            return;
        }
    });
} else {
    message.channel.send('This command is not available for Sunset LiteMode')
} 
  });
}
module.exports.help = {
    name: "clearmoney",
    usage: "clearmoney",
    info: "Clear your balance and become a hobo"
}