const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const webdict = require('webdict');
const fs = require('fs')

module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var report = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Command Depricated')
  .setDescription('To submit an Error Report please go to the Sunset Discord server and use the command `ss!bugreport`')
  .addField(data.prefix + 'error-report <error>','<error> = Error to report')
  // removed 
  
  var errreprtmlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Error Report Command Used')
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
  if(modlog) return modlog.send({embed: errreprtmlembed}).catch(console.error);
    } else {
      // LiteMode
      message.channel.send('To submit an Error Report please go to the Sunset Discord server and use the command `ss!bugreport`')
    }
  });
}
module.exports.help = {
  name: "error-report",
  info: "Report an error",
  usage: "error-report <error>"
}
