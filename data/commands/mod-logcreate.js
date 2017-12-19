const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
module.exports.run = (client, message, args, data) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  var nopermsembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Mod Log Perm Error')
    .setDescription("Please give me the permission `MANAGAE_CHANNELS`")
    // removed 

  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: nopermsembed}).catch(console.error);
    message.guild.createChannel('mod-log').catch(console.error);
}
module.exports.help = {
  name: "mod-logcreate",
  info: "Create a mod-log channel",
  usage: "mod-logcreate"
}
