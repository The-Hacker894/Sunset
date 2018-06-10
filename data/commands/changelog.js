const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
    if(commandlock.includes('true')) {       
      if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
    } 
    var changes = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('What\'s New in Sunset v' + data.newversion)
        .setDescription(data.changelog)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        return message.channel.send({embed: changes})
    

}
module.exports.help = {
    name: "changelog",
    info: "What's new with Sunset",
    usage: "changelog"
}