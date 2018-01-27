const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const prettyMs = require('pretty-ms');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  var uptimeembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle(client.user.username + ' Uptime')
  .setDescription('Uptime: ' + prettyMs(client.uptime, {verbose: true}))
  // removed 
  var uptimemlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Uptime Command Used')
  .setDescription(message.author.username)
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
  message.channel.send({embed: uptimeembed})
  console.log(boxen('[Uptime] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + prettyMs(client.uptime, {verbose: true}), {padding: 1}))
  if(modlog) return modlog.send(uptimemlembed)
}
module.exports.help = {
  name: "uptime",
  info: "Get Sunset's total uptime in seconds, minutes, hours, and days",
  usage: "uptime"
}
