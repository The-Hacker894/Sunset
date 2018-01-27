const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var permerrorsnembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Set Nick Usage')
  .setDescription('You must have the permissions `CHANGE_NICKNAME` and `MANAGE_NICKNAMES`')
  // removed 
var permboterrorsnembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Set Nick Usage')
  .setDescription('I music have the permissions `CHANGE_NICKNAME` and `MANAGE_NICKNAMES`')
  // removed 
if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
if(!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
const nickuserset = message.guild.member(message.mentions.users.first())
const usernick = message.content.split(/\s+/g).slice(2).join(" ")
var nickembed = new Discord.RichEmbed()
  .setTitle('Nickname Usage')
  .setColor(data.embedcolor)
  .setDescription('You must provide a nickname and a user *or bot* to set a nickname for.')
  .addField(data.prefix + 'setnick <@user> <nick>','<@user> = Mentioned user | <nick> = Nickname')
  // removed 
var nickmlembed = new Discord.RichEmbed()
  .setTitle('Nickname Command Used')
  .setColor(data.embedcolor)
  .setDescription(message.author.username + '\n \n **User:** ' + nickuserset + '\n **Nick:** ' + usernick)
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
if(nickuserset < 1) return message.channel.send({embed: nickembed}).catch(console.error);
if(usernick < 1) return message.channel.send({embed: nickembed}).catch(console.error);
    message.guild.member(nickuserset).setNickname(usernick).catch(console.error);
    message.delete()
    message.channel.send('Check ' + nickuserset + '\'s nick/username to see if the results match ' + usernick).catch(console.error);
    console.log(boxen('[SetNick] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + nickuserset + ' | ' + usernick, {padding: 1}))
    if(modlog) return modlog.send({embed: nickmlembed}).catch(console.error);
  }
  module.exports.help = {
    name: "setnick",
    info: "Set a user or bot's nickname",
    usage: "setnick <@user> <nickname>"
  }
