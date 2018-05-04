const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    
    var channelMention = args[1]
    var announceMessage = message.content.split(/\s+/g).slice(2).join(" ");
    var noChannel = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('No Channel Provided')
        .setDescription('Please provide a channel to send an announcement in')
    var noMessage = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('No Announcement Message Provided')
        .setDescription('Please provded a message to send an announcement with')
    var channelNoExist = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Channel Doesn\'t Exist')
        .setDescription('The channel that was provided does not exist.')
    var noPerms = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Permission Error')
        .setDescription('`MANAGE_CHANNELS` and `KICK_MEMBERS` permissions required')
    if(!channelMention) return message.channel.send({embed: noChannel})
    if(noMessage.length < 1) return message.channel.send({embed: noMessage})
    var announceChannel = channelMention.substr(2).slice(0, -1);
    var announcementChannel = client.channels.find("id", announceChannel)
    var announcementChannelExists = client.channels.exists("id", announceChannel)
    if(!announcementChannelExists) return message.channel.send({embed: channelNoExist})
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send({
        embed: noPerms
      }).catch(console.error);
      if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send({
        embed: noPerms
      }).catch(console.error);
      if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({
        embed: noPerms
      }).catch(console.error);
    var success = new Discord.RichEmbed()
        .setColor(colors.success)
        .setTitle('Announcement Sent')
        .setDescription('Announcement has been sent to ' + announcementChannel)
    
    message.channel.send({embed: success})
    announcementChannel.send(announceMessage)


}
module.exports.help = {
    name: "announce",
    info: "Make announcements in a seperate channel",
    usage: "announce <#channel> <message>"
}