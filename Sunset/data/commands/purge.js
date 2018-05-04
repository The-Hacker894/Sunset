const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement,colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var permembed = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setTitle('Purge Usage')
  .setDescription('You must have the permission `MANAGE_MESSAGES`')
  .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge')
  // removed 
var permbotembed = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setTitle('Purge Usage')
  .setDescription('I have have the permission `MANAGE_MESSAGES`')
  .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge')
  // removed 

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send({embed: permembed})
  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: permbotembed})

  var lengthtoosmall = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setDescription('You must provide a number of message to purge; 2 - 200')
    .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge')
    // removed 

  var lengthtoobig = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setDescription('The amount of messages to purge cannot be greater than 200')
    .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge (cannot be greater than 200)')
    // removed 

  var purgetoosmall = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setDescription('The amount of messages to purge can be as small as 2 but larger than 200')
    .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge (2 - 200)')
    // removed 

var purgearg = message.content.split(' ').slice(1).join(' ')
var roundedpurgearg = Math.round(purgearg / 2)
var multpurgearg = roundedpurgearg * 2

if(isNaN(roundedpurgearg)) return message.channel.send('Please provide an integer.')
  if(roundedpurgearg < 1) return message.channel.send({embed: lengthtoosmall})
  if(roundedpurgearg > 200) return message.channel.send({embed: lengthtoobig})

  message.channel.send('***Deleting ' + multpurgearg + ' messages...***')
  message.delete()
  message.delete()
  message.guild.member(message.channel.bulkDelete(roundedpurgearg, true))
    message.guild.member(message.channel.bulkDelete(roundedpurgearg, true))
  console.log(boxen('[Purge] | ' + multpurgearg + ' | ' + message.guild.name + ' | ' + message.author.username, {padding: 1}))
  var purgemlembed = new Discord.RichEmbed()
    .setColor(colors.system)
    .setTitle('Purge Command Used')
    .setDescription(message.author.username)
    .addField(multpurgearg, '_')
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
  if(modlog) return modlog.send({embed: purgemlembed})
    } else {
      // LiteMode


  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) +'```')
  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) +'```')

var purgearg = message.content.split(' ').slice(1).join(' ')
var roundedpurgearg = Math.round(purgearg / 2)
var multpurgearg = roundedpurgearg * 2

if(isNaN(roundedpurgearg)) return message.channel.send('Please provide an integer.')
  if(roundedpurgearg < 1) return message.channel.send('You must provide a number of message to purge; 2 - 200')
  if(roundedpurgearg > 200) return message.channel.send('The amount of messages to purge cannot be greater than 200')

  message.channel.send('***Deleting ' + multpurgearg + ' messages...***')
  message.delete()
  message.delete()
  message.guild.member(message.channel.bulkDelete(roundedpurgearg, true))
    message.guild.member(message.channel.bulkDelete(roundedpurgearg, true))
    }
  });
}
module.exports.help  = {
  name: "purge",
  info: "Purge 2 - 100 in the current channel",
  usage: "purge <value>"
}
