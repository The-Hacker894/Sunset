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
const userprofile = message.content.split(' ').slice(1).join(' ')
const otheruserprofile = message.guild.member(message.mentions.users.first())
var userprofilelengthtooshortembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
  .setTitle('Profile')
  .addField('Username', message.author.username, true)
  .addField('ID', message.author.id, true)
  .addField('Discriminator', message.author.discriminator, true)
  .addField('Joined',message.member.joinedAt, true)
  .addField('Joined Timestamp', message.member.joinedTimestamp, true)
  .addField('Status', message.author.presence.status, true)
  .setThumbnail(message.author.displayAvatarURL)
  .setFooter(embedfooter)
var profilemlembed = new Discord.RichEmbed()
  .setColor('FFCE00')
  .setTitle(`Profile Command Used`)
  .setDescription(message.author.username)
  .setAuthor(message.author.username ,message.author.displayAvatarURL)
  .setFooter(embedfooter)

if(userprofile.length < 1) return message.channel.send({embed: userprofilelengthtooshortembed})
var profileembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
  .setTitle(`Profile`)
  .addField('Username', message.guild.member(message.mentions.users.first()), true)
  .addField('ID', message.guild.member(message.mentions.users.first()).id, true)
  .addField('Discriminator', message.mentions.users.first().discriminator, true)
  .addField('Joined', message.guild.member(message.mentions.users.first()).joinedAt, true)
  .addField('Joined Timestamp', message.guild.member(message.mentions.users.first()).joinedTimestamp, true)
  .addField('Status', message.guild.member(message.mentions.members.first()).presence.status, true)
  .setThumbnail(message.mentions.users.first().displayAvatarURL)
  .setFooter(embedfooter)
  message.channel.send({embed: profileembed}).catch(console.error);

  if(modlog) return modlog.send({embed: profilemlembed}).catch(console.error);
}
module.exports.help = {
  name: "profile",
  info: "Shows the profile of the mentioned user or yourself",
  usage: "profile <@user>"
}
