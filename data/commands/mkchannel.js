const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  var channeltype = args[1]
  var channelname = message.content.split(channeltype).slice(1).join(' ')
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  
var embedccpermreturn = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Channel Create Usage')
  .setDescription('You must have the permission `MANAGE_CHANNELS`') 
  .addField(data.prefix + 'mkchannel <name>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
  var embedbotccpermreturn = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle("Channel Create Usage")
  .setDescription('I must have the permission `MANAGE_CHANNELS`')
  .addField(data.prefix + 'mkchannel <name>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
 var mkchannelreasonerrorembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Channel Create Usage')
  .setDescription('You must provide a reason for the Channel Creation')
  .addField(data.prefix + 'mkchannel <name> <reason>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: embedccpermreturn}).catch(console.error);
  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: embedbotccpermreturn}).catch(console.error);

  var channelnameerror = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Channel Name Error')
    .setDescription('You must proivde a channel name')
    var channeltypeerror = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Channel Type Error')
    .setDescription('You must proivde a channel type `voice` `text` or `category`')
    var channelcremlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Make Channel Command Used')
    .setDescription('Channel Type: ' + channeltype + '\nChannel Name: ' + channelname)
    .setAuthor(message.author.username ,message.author.displayAvatarURL)
    var channelcreatesuccess = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Channel Created')
      .setDescription('Channel Type: ' + channeltype + '\nChannel Name: ' + channelname)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channeltypes = ['voice', 'text', 'category']

  if(!channeltype) return message.channel.send({embed: channeltypeerror})
  if(!channelname) return message.channel.send({embed: channelnameerror})
  if(channeltypes.some(types => channeltype.includes(types))) {
      message.guild.createChannel(channelname, channeltype).catch(console.error);
      message.channel.send({embed: channelcreatesuccess})
      console.log(boxen('[Make Channel] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + channeltype + ' | ' + channelname, {padding: 1}))
      if(modlog) return modlog.send({embed: channelcremlembed})
  } else {
    message.channel.send({embed: channeltypeerror})
  }
}
module.exports.help = {
  name: "mkchannel",
  info: "Create a text or voice channel",
  usage: "mkchannel <name>"
}
