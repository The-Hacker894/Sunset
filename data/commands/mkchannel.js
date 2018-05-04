const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if (commandlock.includes('true')) {
    if (message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')
  }
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
      var channeltype = args[1]
      var channelname = message.content.split(channeltype).slice(1).join(' ')
      const modlog = message.guild.channels.find('name', 'mod-log');
      const announcements = message.guild.channels.find('name', 'announcements')

      var embedccpermreturn = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Channel Create Usage')
        .setDescription('You must have the permission `MANAGE_CHANNELS`')
        .addField(data.prefix + 'mkchannel <name>', '<name> = Name for Channel | <reason> = Reason for Channel Creation')
      var embedbotccpermreturn = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle("Channel Create Usage")
        .setDescription('I must have the permission `MANAGE_CHANNELS`')
        .addField(data.prefix + 'mkchannel <name>', '<name> = Name for Channel | <reason> = Reason for Channel Creation')
      var mkchannelreasonerrorembed = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Channel Create Usage')
        .setDescription('You must provide a reason for the Channel Creation')
        .addField(data.prefix + 'mkchannel <name> <reason>', '<name> = Name for Channel | <reason> = Reason for Channel Creation')
      if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send({
        embed: embedccpermreturn
      }).catch(console.error);
      if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({
        embed: embedbotccpermreturn
      }).catch(console.error);

      var channelnameerror = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Channel Name Error')
        .setDescription('You must proivde a channel name')
      var channeltypeerror = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Channel Type Error')
        .setDescription('You must proivde a channel type `voice` `text` or `category`')
      var channelcremlembed = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Make Channel Command Used')
        .setDescription('Channel Type: ' + channeltype + '\nChannel Name: ' + channelname)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
      var channelcreatesuccess = new Discord.RichEmbed()
        .setColor(colors.success)
        .setTitle('Channel Created')
        .setDescription('Channel Type: ' + channeltype + '\nChannel Name: ' + channelname)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
      var channeltypes = ['voice', 'text', 'category']

      if (!channeltype) return message.channel.send({
        embed: channeltypeerror
      })
      if (!channelname) return message.channel.send({
        embed: channelnameerror
      })
      if (channeltypes.some(types => channeltype.includes(types))) {
        message.guild.createChannel(channelname, channeltype).catch(console.error);
        message.channel.send({
          embed: channelcreatesuccess
        })
        console.log(boxen('[Make Channel] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + channeltype + ' | ' + channelname, {
          padding: 1
        }))
        if (modlog) return modlog.send({
          embed: channelcremlembed
        })
      } else {
        message.channel.send({
          embed: channeltypeerror
        })

      }
    } else {
      // LiteMode

      var channeltype = args[1]
      var channelname = message.content.split(channeltype).slice(1).join(' ')

      if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);
      if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('```' + boxen('MANAGE_CHANNELS permission required', {padding: 1}) + '```').catch(console.error);

      var channelcreatesuccess = new Discord.RichEmbed()

      var channeltypes = ['voice', 'text', 'category']

      if (!channeltype) return message.channel.send('You must proivde a channel type `voice` `text` or `category`')
      if (!channelname) return message.channel.send('```' + boxen('You must proivde a channel name', {padding: 1}) +'```')
      if (channeltypes.some(types => channeltype.includes(types))) {
        message.guild.createChannel(channelname, channeltype).catch(console.error);
        message.channel.send('```' + boxen('Channel Type: ' + channeltype + '\nChannel Name: ' + channelname, {padding: 1}) +'```')
      }
    }
  });
}
module.exports.help = {
  name: "mkchannel",
  info: "Create a text or voice channel",
  usage: "mkchannel <name>"
}