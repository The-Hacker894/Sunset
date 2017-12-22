const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const flip = require('flip-text');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  const flipmsg = message.content.split(' ').slice(1).join(' ')
  var fliperrembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle("Flip Usage Error")
    .setDescription('You must provide some text to flip')
  if(flipmsg.length < 1) return message.channel.send({embed: fliperrembed})
  message.channel.send('`' + flip(flipmsg) + '`')
  console.log(boxen('[Fliptext] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + flip(flipmsg) + ' | ' + flipmsg))
  var fliptextmlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Fliptext Command Used')
    .setDescription(message.author.username)
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
    if(modlog) return modlog.send({embed: fliptextmlembed}).catch(console.error);
}
module.exports.help = {
  name: "fliptext",
  info: "Flips the given text",
  usage: "fliptext <message>"
}
