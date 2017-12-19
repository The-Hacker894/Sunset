const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  var announcement_embed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Announcement')
    .setDescription(announcement.announce)
    message.channel.send({embed: announcement_embed})
  var announcemlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle("Announcement Command Used")
    .setDescription(announcement.announce)
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    // removed 
    if(modlog) return modlog.send({embed: announcemlembed}).catch(console.error);
}
module.exports.help = {
  name: "announcement",
  info: "Check the current announcement",
  usage: "announcement"
}
