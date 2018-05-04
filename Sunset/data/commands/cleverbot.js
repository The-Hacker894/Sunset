const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const cleverbot = require("cleverbot.io")
const clever = new cleverbot('MzNwGnyfgL1iW54C','uZBfESqRedUjuajf0DJ78jD5LWEK5JWe');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
  message.channel.startTyping()
  const modlog = message.guild.channels.find('name', 'mod-log');
  var announcements = message.guild.channels.find('name', 'announcements')
var clevermessage = message.content.split(' ').slice(1).join(' ')
if(clevermessage.length < 1) return message.channel.send("Please provide a message.")
clever.setNick("Sunset")
clever.create(function (err, session) {
  clever.ask(clevermessage, function (err, response) {
    message.channel.send(message.author.toString() + ', ' + response);
    message.channel.stopTyping()
    console.log(boxen('[Cleverbot] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + clevermessage + ' | ' + response, {padding: 1}))
    var cleverbotmlembed = new Discord.RichEmbed()
    .setColor(colors.system)
    .setTitle('CleverBot Command Used')
    .setDescription('**Message:** ' + clevermessage + '\n **Reply:** ' + response)
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    if(modlog) return modlog.send({embed: cleverbotmlembed})
  });
});
    } else {
      message.channel.startTyping()
      var clevermessage = message.content.split(' ').slice(1).join(' ')
if(clevermessage.length < 1) return message.channel.send("Please provide a message.")
clever.setNick("Sunset LiteMode")
clever.create(function (err, session) {
  clever.ask(clevermessage, function (err, response) {
    message.channel.send(message.author.toString() + ', ' + response);
    message.channel.stopTyping()
  });
});
    }
  });
}
module.exports.help = {
  name: "cleverbot",
  info: "Cleverbot.io at its finest",
  usage: "cleverbot <message>"
}
