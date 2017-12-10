const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var permembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Purge Usage')
  .setDescription('You must have the permission `MANAGE_MESSAGES`')
  .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge')
  .setFooter(embedfooter)
var permbotembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Purge Usage')
  .setDescription('I have have the permission `MANAGE_MESSAGES`')
  .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge')
  .setFooter(embedfooter)

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send({embed: permembed})
  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: permbotembed})

  var lengthtoosmall = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setDescription('You must provide a number of message to purge; 2 - 200')
    .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge')
    .setFooter(embedfooter)

  var lengthtoobig = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setDescription('The amount of messages to purge cannot be greater than 200')
    .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge (cannot be greater than 200)')
    .setFooter(embedfooter)

  var purgetoosmall = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setDescription('The amount of messages to purge can be as small as 2 but larger than 200')
    .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge (2 - 200)')
    .setFooter(embedfooter)

var purgearg = message.content.split(' ').slice(1).join(' ')
var roundedpurgearg = Math.round(purgearg / 2)

  if(roundedpurgearg.length < 1) return message.channel.send({embed: lengthtoosmall})
  if(roundedpurgearg.length > 200) return message.channel.send({embed: lengthtoobig})
  if(isNaN(roundedpurgearg)) return message.channel.send('Please provide an integer.')
  message.channel.send('Deleting...')
  message.delete()
  message.delete()
  message.guild.member(message.channel.bulkDelete(roundedpurgearg))
    message.guild.member(message.channel.bulkDelete(roundedpurgearg))
  console.log('Purge | ' + roundedpurgearg + ' | ' + message.guild.name + ' | ' + message.author.username)
  var purgemlembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Purge Command Used')
    .setDescription(message.author.username)
    .addField(roundedpurgearg, '_')
    .setAuthor(message.author.username ,message.author.avatarURL)
    .setFooter(embedfooter)
  if(modlog) return modlog.send({embed: purgemlembed})
}
module.exports.help  = {
  name: "purge",
  info: "Purge 2 - 100 in the current channel",
  usage: "purge <value>"
}
