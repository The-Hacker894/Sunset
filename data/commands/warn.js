const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
const momenttime = moment().format('h:mm:ss a')
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, warn, warnedinfo) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var warnembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setDescription('You must supply a reason and a mentioned user.')
  .addField(data.prefix + 'warn <@user> <reason>','<@user> = @Mentioned User | <reason> = Reason for warn')
  // removed 


const reason = message.content.split(/\s+/g).slice(2).join(" ");
const usertowarn = message.guild.member(message.mentions.users.first());

  if(reason.length < 1) return message.channel.send({embed: warnembed}).catch(console.error);
  if(message.mentions.users.size < 1) return message.channel.send({embed: warnembed}).catch(console.error);

  var permerrorembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setDescription('Please note that this command is not finished')
  .addField('Action','Warning')
  .addField('User:', usertowarn)
  .addField('Moderator', message.author.username)
  .addField('Reason', reason)
  // removed 
  message.channel.send({embed: permerrorembed}).catch(console.error);
  var warnmlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Warn Command Used')
    .setDescription(message.author.username)
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
    .addField(usertowarn, reason)
  if(modlog) return modlog.send({embed: warnmlembed}).catch(console.error);


}
module.exports.help = {
  name: "warn",
  info: "Warn the mentioned user",
  usage: "warn <@user> <reason>"
}
