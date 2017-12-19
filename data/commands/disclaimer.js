const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  var disclaimerembed = new Discord.RichEmbed()
          .setColor(data.embedcolor)
          .setTitle('Disclaimer for Sunset')
          .setDescription('**Sunset logs a wide variety of data** \n This includes: \n \n -Any updates done to messages \n -Commands Used \n *This data is used for some moderation features*. **The data that is logged by Sunset is in no way malicious and cannot be used against you.**')
          // removed 
          message.channel.send({embed: disclaimerembed})
        var disclaimermlembed = new Discord.RichEmbed()
          .setColor(data.embedcolor)
          .setTitle('Disclaimer Command Used')
          .setDescription(message.author.username)
          // removed 

          if(modlog) return modlog.send({embed: disclaimermlembed}).catch(console.error);

}
module.exports.help = {
  name: "disclaimer",
  info: "Disclaimer about the amount of data Sunset *may or may not log*",
  usage: "disclaimer"
}
