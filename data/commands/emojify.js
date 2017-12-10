const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
const webdict = require('webdict');
translate = require('moji-translate');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  const emsg = message.content.split(' ').slice(1).join(' ')
  var emojierrembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle("Emoji Usage Error")
    .setDescription('You must provide something to emojify')
  if(emsg.length < 1) return message.channel.send({embed: emojierrembed})
  message.channel.send(translate.translate(emsg));
  var emojimlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Emoji Command Used')
    .setDescription(message.author.username)
    .setAuthor(message.author.username ,message.author.avatarURL)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: emojimlembed}).catch(console.error);
}
module.exports.help = {
  name: "emojify",
  info: "Emojifies the given message *if possible*",
  usage: "emojify <message>"
}
