const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
const momenttime = moment().format('h:mm:ss a')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
const whoisuserprofile = message.content.split(' ').slice(1).join(' ')
const whoisotheruserprofile = message.guild.member(message.mentions.users.first())
var whoisuserprofilelengthtooshortembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Profile Help')
  .setDescription('You must provide a mentioned user')
  .addField(data.prefix + 'whois <@user>','<@user> =  Mentioned User')
  // removed 

  var whoismlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Who Is Command Used')
    .setDescription(message.author.username)
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 

if(whoisuserprofile.length < 1) return message.channel.send({embed: whoisuserprofilelengthtooshortembed})
var whoisprofileembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle(`Profile`)
  .addField('Username', message.guild.member(message.mentions.users.first()), true)
  .addField('ID', message.guild.member(message.mentions.users.first()).id, true)
  .addField('Discriminator', message.mentions.users.first().discriminator, true)
  .addField('Joined', message.guild.member(message.mentions.users.first()).joinedAt, true)
  .addField('Joined Timestamp', message.guild.member(message.mentions.users.first()).joinedTimestamp, true)
  .addField('Status', message.guild.member(message.mentions.members.first()).presence.status, true)
  .setThumbnail(message.mentions.users.first().displayAvatarURL)
  // removed 
  message.channel.send({embed: whoisprofileembed}).catch(console.error);
  if(modlog) return modlog.send({embed: whoismlembed}).catch(console.error);
}
module.exports.help = {
  name: "whois",
  info: "Get info on the mentioned user or yourself",
  usage: "whois <@user>"
}
