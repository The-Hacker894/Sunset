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
var nopermsembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Announcements Perm Error')
  .setDescription("Please give me the permission `MANAGAE_CHANNELS`")
  .setFooter(embedfooter)

if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: nopermsembed}).catch(console.error);
  message.guild.createChannel('announcements').catch(console.error);
}
module.exports.help = {
  name: "announcementscreate",
  info: "Create an announcements channel",
  usage: "announcementscreate"
}
