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
var sayembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('Say Usage')
.setDescription('You must provide a message to say')
.addField(data.prefix + 'say <message>','<message> = Message to say')
// removed 

const message2say = message.content.split(' ').slice(1).join(' ')
if(message2say.length < 1) return message.channel.send({embed: sayembed}).catch(console.error);
if(message2say.includes('@<')) return;

    var stated = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setDescription(message2say)
      .setAuthor(message.author.username, message.author.displayAvatarURL)

    message.channel.send({embed: stated}).catch(console.error);
    console.log(boxen('[Say] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message2say, {padding: 1}))
    message.delete()

    var saymlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Say Command Used')
      .setDescription(message.author.username)
      .addField(message2say, '_')
      .setAuthor(message.author.username ,message.author.avatarURL)
      // removed 
    if(modlog) return modlog.send({embed: saymlembed}).catch(console.error);
}
module.exports.help = {
  name: "say",
  info: "Send a message through Sunset",
  usage: "say <message>"
}
