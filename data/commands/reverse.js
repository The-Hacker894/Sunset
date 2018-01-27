const reverse = require('reverse-string')
const prettyMs = require('pretty-ms');
const pusage = require('pidusage')
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const embedcolor = data.embedcolor
  const rmsg = message.content.split(' ').slice(1).join(' ')
  var reverseerrembed = new Discord.RichEmbed()
    .setColor(embedcolor)
    .setTitle("Reverse Error")
    .setDescription("Please provide something to reverse")
  if(rmsg.length < 1) return message.channel.send({embed: reverseerrembed})
  var reversed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setDescription(reverse(rmsg))
    .setAuthor(message.author.username ,message.author.avatarURL)
  message.channel.send({embed: reversed})
  console.log(boxen('[Reverse] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + rmsg, {padding: 1}))
  var reversemlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Reverse Command Used')
    .setDescription(message.author.username)
    .addField(rmsg, reverse(rmsg))
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
  if(modlog) return modlog.send({embed: reversemlembed}).catch(console.error);
}
module.exports.help = {
  name: "reverse",
  info: "Reverse Text",
  usage: "reverse <text>"
}
