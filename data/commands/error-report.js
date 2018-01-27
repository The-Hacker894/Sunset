const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const webdict = require('webdict');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
const message4hacker = message.content.split(' ').slice(1).join(' ')
var dmhembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setDescription('You must provide an error to report')
  .addField(data.prefix + 'error-report <error>','<error> = Error to report')
  // removed 

if(message4hacker.length < 1) return message.channel.send({embed: dmhembed}).catch(console.error);
  message.delete()
  client.users.get(data.ownerid).send('A message from the user ' + message.author.username + ' has arrived.')
  client.users.get(data.ownerid).send(message4hacker)
  console.log(boxen('[Error Report] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message4hacker))
  var errreprtmlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Error Report Command Used')
    .setDescription(message.author.username)
    .addField(message4hacker, '_')
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
  if(modlog) return modlog.send({embed: errreprtmlembed}).catch(console.error);
}
module.exports.help = {
  name: "error-report",
  info: "Report an error",
  usage: "error-report <error>"
}
