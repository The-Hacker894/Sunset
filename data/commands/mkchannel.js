const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var embedccpermreturn = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Channel Create Usage')
  .setDescription('You must have the permission `MANAGE_CHANNELS`')
  .addField(data.prefix + 'mkchannel <name>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
  .setFooter(embedfooter)
var embedbotccpermreturn = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle("Channel Create Usage")
  .setDescription('I must have the permission `MANAGE_CHANNELS`')
  .addField(data.prefix + 'mkchannel <name>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
  .setFooter(embedfooter)
var mkchannelreasonerrorembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Channel Create Usage')
  .setDescription('You must provide a reason for the Channel Creation')
  .addField(data.prefix + 'mkchannel <name> <reason>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: embedccpermreturn}).catch(console.error);
  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: embedbotccpermreturn}).catch(console.error);
//  if(chnlcreatereason.length < 1) return message.channel.send({embed: mkchannelreasonerrorembed})

  var channelcembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setDescription('You must provide a name for your new channel.')
    .addField(data.prefix + 'mkchannel <name>','<name> = Name for Channel')
    .setFooter(embedfooter)
//   /\s+/g
  let channelname = message.content.split(' ').slice(1).join(' ')

  if(channelname.length < 1) return message.channel.send({embed: channelcembed}).catch(console.error);
      message.guild.createChannel(channelname, 'text').catch(console.error);

      message.channel.send('Text Channel ' + channelname + ' has been created ' + message.author.username + '.')
        console.log('A Text Channel has been created on ' + message.guild.name + '.')
        var channelcremlembed = new Discord.RichEmbed()
          .setColor(data.embedcolor)
          .setTitle('Make Channel Command Used')
          .setDescription(message.author.username + '\n \n **Name:** ' + channelname)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
          if(modlog) return modlog.send({embed: channelcremlembed}).catch(console.error);
}
module.exports.help = {
  name: "mkchannel",
  info: "Create a text channel",
  usage: "mkchannel <name>"
}
