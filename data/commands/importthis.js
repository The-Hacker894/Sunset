const Attachment = require('discord.js').Attachment
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
message.channel.send({file: new Attachment('./data/files/images/memes/importthis.jpg', 'importthis.jpg')})
console.log(boxen('[Import This] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
var importtmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Import This Command Used')
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 

  if(modlog) return modlog.send({embed: importtmlembed}).catch(console.error);
}
module.exports.help = {
  name: "importthis",
  info: "The Zen of Python",
  usage: 'importthis'
}
