const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const writeFile = require("write")
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
    message.channel.startTyping()
    
    const modlog = message.guild.channels.find('name', 'mod-log');    
    fs.exists(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, function(exists) {
        if (exists) {
          fs.stat(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, function(err, stats) { 
            message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, `textfile.txt`)).then(message => {
                message.channel.stopTyping()
            });
          });
        } else {
          message.channel.send('You do not have any previous Text Files').then(message => {
              message.channel.stopTyping()
          })
        }
      });
      console.log(boxen('[LastTXT] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
      var lastqrmlembed = new Discord.RichEmbed()
          .setColor(colors.system)
          .setTitle('Last TXT Command Used')
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          if(modlog) return modlog.send({embed: lastqrmlembed})
    } else {
      //LiteMode

      fs.exists(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, function(exists) {
        if (exists) {
          fs.stat(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, function(err, stats) { 
            message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, `textfile.txt`)).then(message => {
                message.channel.stopTyping()
            });
          });
        } else {
          message.channel.send('```' + boxen('You do not have any previous Text Files', {padding: 1}) + '```').then(message => {
              message.channel.stopTyping()
          })
        }
      });
    }
  });
}
module.exports.help = {
    name: "lasttxt",
    info: "Loads the last text file created",
    usage: "lasttxt"
}